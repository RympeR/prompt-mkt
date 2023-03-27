from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import CustomUserSerializer, UserRegisterSerializer, UserLoginSerializer, UserProfileSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

class ProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class UserLoginView(views.APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UsernameProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'



class SettingsView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

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

