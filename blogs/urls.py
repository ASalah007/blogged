
from django.urls import path

from . import views

app_name = 'blogs'

urlpatterns = [
    path('create/', views.BlogView.as_view(), name="blog_create"),
    path('list/', views.BlogView.as_view(), name="blog_list"),
    path('detail/<int:pk>/', views.BlogDetailView.as_view(), name="blog_detail"),
    path('public_blogs/<int:pk>/', views.UserPublicBlogView.as_view(), name="public_blogs"),
    path('interact/', views.BlogInteractionView.as_view(), name="blog_interact"),
    path('comment/', views.BlogCommentView.as_view(), name="blog_comment"),
    path("comments/<int:pk>/", views.BlogCommentView.as_view(), name="list_comments"),
    path("stats/<int:pk>/", views.BlogStatsView.as_view(), name="list_comments"),
]
