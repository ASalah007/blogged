from django.shortcuts import get_object_or_404
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["full_name", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        User = get_user_model()
        return User.objects.create_user(**validated_data)
    

class FollowSerializer(serializers.Serializer):
    follow = serializers.BooleanField(default=True) # true => follow, false => unfollow
    user = serializers.IntegerField()


    def create(self, validated_data):
        request = self.context.get("request")
        follower = request.user
        following = get_object_or_404(get_user_model(), pk=validated_data.get("user"))
        if validated_data.get("follow"):
            follower.followings.add(following)
        else: 
            follower.followings.remove(following)
        
        follower.save()

        return {"user": validated_data.get("user"), "follow": validated_data.get("follow")}


class TokenSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Token
        fields = "__all__"



