from rest_framework import serializers
from .models import Blog, BlogInteraction


class BlogSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Blog
        exclude = ["author", "slug"]
    

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["author"] = request.user
        return super().create(validated_data)


class BlogInteractionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BlogInteraction
        exclude = ["user"]

    
    def create(self, validated_data):
        validated_data["user"] = self.context.get('request').user
        return super().create(validated_data)
    