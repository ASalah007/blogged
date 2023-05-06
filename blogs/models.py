from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.utils import timezone



class Blog(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(max_length=256, blank=True)
    body = models.TextField()
    thumbnail = models.ImageField(upload_to='blog_thumbnails/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pub_date = models.DateTimeField(null=True, blank=True)
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


class BlogComment(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    text = models.TextField()
    reply_to = models.ForeignKey("self", on_delete=models.CASCADE, null=True)


class BlogStats(models.Model):
    blog = models.OneToOneField(Blog, on_delete=models.CASCADE)
    comments_count = models.PositiveIntegerField(null=True, blank=True, default=0)
    updated_at = models.DateTimeField(auto_now=True)


    def update_stats(self, force=False):
        if not force and self.updated_at > timezone.now() - timezone.timedelta(days=1):
            return

        self.comments_count = self.blog.blogcomment_set.all().count()
        self.save()