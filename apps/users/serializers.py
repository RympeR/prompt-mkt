from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'email', 'first_name', 'last_name', 'avatar', 'background_photo', 'social_links', 
            'amount_of_lookups', 'amount_of_likes', 'joined_date', 'custom_prompt_price', 'register_provider',
            'sale_notification_emails', 'new_favorites_emails', 'new_followers_emails', 'new_messages_emails', 
            'new_job_emails', 'new_review_emails', 'new_credits_emails', 'review_reminder_emails', 
            'following_users_new_prompts', 'favorite_prompts'
        )
