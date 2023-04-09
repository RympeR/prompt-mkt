# Generated by Django 4.1.7 on 2023-03-31 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_alter_promptlike_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('0', 'Waiting payment'), ('1', 'In progress'), ('2', 'Completed'), ('3', 'Canceled')], default='0', max_length=100),
        ),
    ]