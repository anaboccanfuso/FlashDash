# Generated by Django 3.2.16 on 2023-03-10 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_auto_20230307_2221'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='recently_viewed',
            field=models.JSONField(blank=True, default={'recently_viewed': []}),
        ),
    ]