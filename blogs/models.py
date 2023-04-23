from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import pre_save



class Blog(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(max_length=256, blank=True)
    body = models.TextField()
    thumbnail = models.ImageField(upload_to='blog_thumbnails/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pub_date = models.DateTimeField(null=True, auto_now_add=True)
    author= models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)

    class Meta: 
        unique_together = ('author', 'title')

@receiver(pre_save, sender=Blog)
def auto_generate_slugs(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.title)


class BlogResource(models.Model):
    resource = models.FileField(upload_to="blog_resources/")
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)


class BlogInteraction(models.Model):
    class Interaction(models.IntegerChoices):
        LIKE = 1
        DISLIKE = 2
        LOVE = 3
        ANGRY = 4
        LAUGH = 5
        SAD = 6

    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    interaction = models.PositiveSmallIntegerField(choices=Interaction.choices)
