# Generated by Django 3.2.16 on 2023-02-09 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_otp'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images')),
            ],
        ),
    ]
