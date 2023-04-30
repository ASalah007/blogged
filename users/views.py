
from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Token
from .serializers import UserSerializer, FollowSerializer, TokenSerializer



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


class VerificationView(generics.GenericAPIView):
    serializer_class = TokenSerializer
    queryset = Token.objects
    lookup_field = "token"

    def get(self, request, token):
        token = self.get_object()
        user = token.user
        user.is_active = True
        user.save()
        return Response("account acctivated successfully", status=status.HTTP_200_OK)




