from django.db.models import Sum, Avg
from django_filters import filters
from rest_framework import generics, permissions
from rest_framework.filters import OrderingFilter
from prompt_mkt.utils.customFilters import PromptFilter
from .models import Prompt, Order
from apps.users.models import User
from apps.users.serializers import CustomUserSerializer
from .serializers import PromptSerializer, MarketplacePromptSerializer, UserOrderSerializer, OrderSerializer
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
    queryset = User.objects.annotate(total_sells=Sum('prompt_creator__sell_amount')).order_by('-total_sells')[:4]
    serializer_class = CustomUserSerializer


class FavoritePromptsView(generics.ListAPIView):
    queryset = User.favorited_by.through.objects.all()
    serializer_class = PromptSerializer


class PromptSearchFilter(filters.CharFilter):
    search_param = 'search'

    def filter_queryset(self, request, queryset, view):
        search = request.query_params.get(self.search_param, None)
        if search:
            return queryset.filter(name__icontains=search)
        return queryset


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


class CreateOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserOrdersView(generics.ListAPIView):
    serializer_class = UserOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)

