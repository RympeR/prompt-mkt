# Generated by Django 4.1.7 on 2023-03-27 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_alter_prompt_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='prompt',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
        ),
    ]
