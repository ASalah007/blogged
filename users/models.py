from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
        if not email:  
            raise ValueError("you must provide an email to create a user")
        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('is_staff', True) 
        other_fields.setdefault('is_superuser', True) 
        other_fields.setdefault('is_active', True) 

        if other_fields.get("is_superuser") is not True:
            raise ValueError("superuser must have is_superuser=True")

        if other_fields.get("is_staff") is not True:
            raise ValueError("superuser must have is_staff=True")
        
        return self.create_user(email, password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=64)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    followings = models.ManyToManyField('self', symmetrical=False, related_name="followers")

    objects = UserManager()

    USERNAME_FIELD = 'email'


    def get_public_blogs(self):
        return self.blog_set.filter(pub_date__lte=timezone.now())