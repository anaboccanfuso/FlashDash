# Generated by Django 4.1.3 on 2023-01-26 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_set_subjects'),
    ]

    operations = [
        migrations.AddField(
            model_name='set',
            name='identifier',
            field=models.TextField(default=''),
        ),
    ]
