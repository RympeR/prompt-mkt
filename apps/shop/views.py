from django.db.models import Sum
from rest_framework import generics, filters
from .models import Prompt
from apps.users.models import User
from apps.users.serializers import CustomUserSerializer
from .serializers import PromptSerializer


class TopPromptEngineersView(generics.ListAPIView):
    queryset = User.objects.annotate(total_sells=Sum('prompt__sell_amount')).order_by('-total_sells')[:4]
    serializer_class = CustomUserSerializer


class FavoritePromptsView(generics.ListAPIView):
    queryset = User.favorite_prompts.through.objects.all()
    serializer_class = PromptSerializer


class SettingsView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


class PromptSearchFilter(filters.SearchFilter):
    search_param = 'search'


class MainPageView(generics.ListAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer


class PromptSearchView(generics.ListAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer
    filter_backends = [PromptSearchFilter]
    search_fields = ['name']


class PromptDetailView(generics.RetrieveAPIView):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

# Continue with other views based on
