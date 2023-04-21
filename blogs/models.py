from django.db import models
from django.contrib.auth import get_user_model


class Blog(models.Model):
    title = models.CharField(max_length=256)
    body = models.TextField()
    thumbnail = models.ImageField(upload_to='blog_thumbnails/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pub_date = models.DateTimeField()
    author= models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)


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
