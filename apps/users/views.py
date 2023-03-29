from rest_framework import generics, permissions, views
from prompt_mkt.utils.default_responses import api_created_201, api_block_by_policy_451, api_bad_request_400
from .serializers import CustomUserSerializer, UserRegisterSerializer, UserLoginSerializer, UserProfileSerializer, \
    UserFavouritesSerializer, UserPartialSerializer, UserSettingsSerializer
from .models import User
from apps.shop.models import Prompt
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin


class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        try:
            username = request.data['username']
            user, created = User.objects.get_or_create(
                email=request.data['email'].lower(),
                username=username
            )
            if not created:
                assert created, "Already exists"
            else:
                user.set_password(request.data['password'])
                user.save()
                token, _ = Token.objects.get_or_create(user=user)
            return api_created_201({"auth_token": token.key})
        except Exception:
            return api_block_by_policy_451({"info": "already exists"})


class UserLoginView(views.APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({'auth_token': token.key}, status=status.HTTP_200_OK)


class MarkFavourite(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserFavouritesSerializer
    queryset = User.objects.all()

    def put(self, request):
        data = request.data
        user = request.user
        if self.serializer_class(data=data).is_valid():
            prompt = Prompt.objects.get(pk=data['prompt_id'])
            if data.get('favorite'):
                prompt.favorite_prompts.add(user)
                return Response(data)
            prompt.favorite_prompts.remove(user)
            return Response(data)


class LogoutView(APIView):

    def get(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UsernameProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'


class UserPartialUpdateAPI(generics.GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserPartialSerializer


class SettingsView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSettingsSerializer

    def get_object(self):
        return self.request.user


# ... (existing imports)
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.authtoken.models import Token

from .serializers import GoogleUserSerializer, TokenSerializer

GOOGLE_CLIENT_ID = 'your-google-client-id'

class GoogleCallbackSignupView(APIView):
    serializer_class = GoogleUserSerializer

    def post(self, request):
        try:
            idinfo = id_token.verify_oauth2_token(request.data['token'], requests.Request(), GOOGLE_CLIENT_ID)
            email = idinfo['email']
            username = idinfo['name']

            user = User.objects.filter(email=email).first()

            if user:
                if user.register_provider == 'google':
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response(TokenSerializer(token).data)
                else:
                    return Response({'detail': 'Account already exists with a different register provider'}, status=400)

            user = User.objects.create_user(email=email, username=username, register_provider='google')
            token = Token.objects.create(user=user)
            return Response(TokenSerializer(token).data, status=201)

        except ValueError:
            return Response({'detail': 'Invalid token'}, status=400)

class GoogleCallbackLoginView(APIView):
    serializer_class = GoogleUserSerializer

    def post(self, request):
        try:
            idinfo = id_token.verify_oauth2_token(request.data['token'], requests.Request(), GOOGLE_CLIENT_ID)
            email = idinfo['email']

            user = User.objects.filter(email=email, register_provider='google').first()

            if not user:
                return Response({'detail': 'User not found'}, status=404)

            token, _ = Token.objects.get_or_create(user=user)
            return Response(TokenSerializer(token).data)

        except ValueError:
            return Response({'detail': 'Invalid token'}, status=400)

