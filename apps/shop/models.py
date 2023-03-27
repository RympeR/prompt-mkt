from django.db import models
from apps.users.models import User


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class ModelCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='model_category_icons/', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория модели'
        verbose_name_plural = 'Категории моделей'


class Tag(models.Model):
    name = models.CharField(max_length=100)
    is_system = models.BooleanField(default=False)
    icon = models.ImageField(upload_to='tags_icons/', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'


class Attachment(models.Model):
    file_type = models.CharField(max_length=100)
    _file = models.FileField(upload_to='attachments/')

    def __str__(self):
        return self.file_type

    class Meta:
        verbose_name = 'Вложение'
        verbose_name_plural = 'Вложения'


class Rating(models.Model):
    amount_of_stars = models.IntegerField()
    prompt = models.ForeignKey('Prompt', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.amount_of_stars} stars for {self.prompt.name}'

    class Meta:
        verbose_name = 'Рейтинг'
        verbose_name_plural = 'Рейтинги'


class Prompt(models.Model):
    image = models.ImageField(upload_to='prompt_images/')
    model_category = models.ForeignKey(ModelCategory, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=100)
    description = models.TextField()
    token_size = models.IntegerField()
    example_input = models.TextField()
    example_output = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_amount = models.IntegerField(default=0)
    creation_date = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag)
    amount_of_lookups = models.IntegerField(default=0)
    ratings = models.ForeignKey(Rating, on_delete=models.SET_NULL, null=True)
    attachments = models.ManyToManyField(Attachment)
    prompt_template = models.TextField()
    instructions = models.TextField()
    categories = models.ManyToManyField(Category, related_name='prompts')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Запрос'
        verbose_name_plural = 'Запросы'
