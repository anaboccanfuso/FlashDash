# Generated by Django 4.1.3 on 2023-01-26 01:34

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_set_school'),
    ]

    operations = [
        migrations.AddField(
            model_name='set',
            name='subjects',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=30), default=[], size=None),
        ),
    ]
