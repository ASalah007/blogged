
from rest_framework import generics, mixins
from rest_framework.request import Request
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, FollowSerializer


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects


class FollowCreateView(generics.CreateAPIView):
    serializer_class = FollowSerializer

class FollowListView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        list_type = self.kwargs.get("list_type")
        print(list_type)
        if list_type == "followers":
            return self.request.user.followers
        return self.request.user.followings