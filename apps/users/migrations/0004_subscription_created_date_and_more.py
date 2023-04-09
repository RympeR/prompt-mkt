# Generated by Django 4.1.7 on 2023-03-31 11:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_google_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterUniqueTogether(
            name='subscription',
            unique_together={('sender', 'receiver')},
        ),
    ]