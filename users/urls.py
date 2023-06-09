from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("signup/", views.UserCreateView.as_view(), name="signup"),
    path("follow/", views.FollowCreateView.as_view(), name="follow_user"),
    path("list_followers/", views.FollowListView.as_view(),{"list_type": "followers"}, name="list_followers"),
    path("list_followings/", views.FollowListView.as_view(), {"list_type": "followings"}, name="list_followings"),
    path("activate/<str:token>/", views.VerificationView.as_view(), name="verify_user"),
    path("profile/", views.UserDetailView.as_view(), name="user_profile"),
]

