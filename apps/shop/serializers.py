from rest_framework import serializers
from .models import ModelCategory, Tag, Attachment, Rating, Prompt, Category


class ModelCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelCategory
        fields = ('id', 'name', 'icon')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'is_system', 'icon')

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'file_type', '_file')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'amount_of_stars', 'prompt')

class PromptSerializer(serializers.ModelSerializer):
    model_category = ModelCategorySerializer()
    tags = TagSerializer(many=True)
    ratings = RatingSerializer()
    attachments = AttachmentSerializer(many=True)

    class Meta:
        model = Prompt
        fields = (
            'id', 'image', 'model_category', 'price', 'name', 'description', 'token_size', 'example_input', 
            'example_output', 'user', 'review_amount', 'creation_date', 'tags', 'amount_of_lookups', 'ratings', 
            'attachments', 'prompt_template', 'instructions'
        )
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class ModelCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelCategory
        fields = ('id', 'name')

class MarketplacePromptSerializer(serializers.ModelSerializer):
    prompt_category = ModelCategoryListSerializer(source='model_category')

    class Meta:
        model = Prompt
        fields = ('prompt_name', 'prompt_category', 'prompt_main_image')
