# Generated by Django 4.1.3 on 2023-01-16 19:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_answer_correct'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='answers', to='api.question'),
        ),
    ]
