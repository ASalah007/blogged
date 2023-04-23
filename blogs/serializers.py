from rest_framework import serializers
from .models import Blog, BlogInteraction, BlogComment


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
    

class BlogCommentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BlogComment
        exclude = ["user"]
    
    def validate(self, attrs):
        reply_to = attrs.get('reply_to')
        blog = attrs.get('blog')

        if reply_to and reply_to.blog != blog:
            raise serializers.ValidationError("reply must be in the same blog as the comment.")

        return super().validate(attrs)

    def add_extra_kwargs(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user

    def create(self, validated_data):
        self.add_extra_kwargs(validated_data)
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        self.add_extra_kwargs(validated_data)
        return super().update(instance, validated_data)
    

