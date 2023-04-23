# Generated by Django 4.2 on 2023-04-22 08:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogs", "0003_alter_blog_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog",
            name="pub_date",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name="blog",
            name="slug",
            field=models.SlugField(blank=True, max_length=256),
        ),
        migrations.AlterField(
            model_name="blog",
            name="thumbnail",
            field=models.ImageField(
                blank=True, null=True, upload_to="blog_thumbnails/"
            ),
        ),
    ]