from django.urls import path
from . import views

urlpatterns = [
    path('main-page/', views.MainPageView.as_view(), name='main_page'),
    path('search/', views.PromptSearchView.as_view(), name='search'),
    path('prompt/<int:pk>/', views.PromptDetailView.as_view(), name='prompt_detail'),
    path('hire/', views.TopPromptEngineersView.as_view(), name='hire'),
    path('favorites/', views.FavoritePromptsView.as_view(), name='favorites'),
    path('settings/', views.SettingsView.as_view(), name='settings'),
]
