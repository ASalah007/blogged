# Generated by Django 4.2 on 2023-05-02 16:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("blogs", "0005_blogcomment"),
    ]

    operations = [
        migrations.CreateModel(
            name="BlogStats",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("comments_count", models.PositiveIntegerField()),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "blog",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="blogs.blog"
                    ),
                ),
            ],
        ),
    ]
