# Generated by Django 4.1.7 on 2023-03-31 12:11

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shop', '0006_promptlike'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='promptlike',
            unique_together={('sender', 'receiver')},
        ),
    ]
