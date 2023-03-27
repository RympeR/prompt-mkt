from django.db.models import Sum, Avg
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from prompt_mkt.utils.customFilters import PromptFilter
from .models import Prompt
from apps.users.models import User
from apps.users.serializers import CustomUserSerializer
from .serializers import PromptSerializer, MarketplacePromptSerializer
from django_filters import rest_framework as filters



class MarketplaceView(generics.ListAPIView):
    queryset = Prompt.objects.all()
    serializer_class = MarketplacePromptSerializer
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = PromptFilter
    ordering_fields = ['average_rating', 'creation_date', 'sell_amount']

    def get_queryset(self, queryset=None):
        sort_by = self.request.query_params.get('sort_by', None)
        if not sort_by:
            return Prompt.objects.all()
        if 'sell_amount' in sort_by:
            queryset = queryset.order_by('-sell_amount')
        if 'average_rating' in sort_by:
            queryset = queryset.annotate(average_rating=Avg('ratings__amount_of_stars'))
        if 'creation_date' in sort_by:
            queryset = queryset.order_by('-creation_date')
        return queryset


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
