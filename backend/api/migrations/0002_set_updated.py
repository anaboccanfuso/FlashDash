# Generated by Django 4.1.3 on 2022-11-06 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='set',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
