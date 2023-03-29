from django.urls import path
from . import views

urlpatterns = [
    path('main-page/', views.MarketplaceView.as_view(), name='main_page'),
    path('search/', views.PromptSearchView.as_view(), name='search'),
    path('create-prompt/', views.CreatePromptView.as_view(), name='create_prompt'),
    path('prompt/<int:pk>/', views.PromptDetailView.as_view(), name='prompt_detail'),
    path('hire/', views.TopPromptEngineersView.as_view(), name='hire'),
    path('favorites/', views.FavoritePromptsView.as_view(), name='favorites'),
    path('orders/create/', views.CreateOrderView.as_view(), name='create_order'),
    path('orders/', views.UserOrdersView.as_view(), name='user_orders'),
    path('create-attachment/', views.CreateAttachmentView.as_view(), name='create_attachment'),
]
