# Generated by Django 3.2.16 on 2023-03-17 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_merge_0021_alter_image_image_0026_alter_profile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='set',
            name='setLength',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
