
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated

from .models import Blog, BlogInteraction
from .serializers import BlogSerializer, BlogInteractionSerializer


class BlogDetailView(generics.RetrieveUpdateDestroyAPIView, mixins.CreateModelMixin):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.blog_set.all()

class BlogView(generics.ListCreateAPIView):
    
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.blog_set



class UserPublicBlogView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        writer_pk = self.kwargs.get('pk')
        print(writer_pk)
        writer = get_object_or_404(get_user_model(), pk=writer_pk)
        return writer.get_public_blogs()


class BlogInteractionView(mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          generics.GenericAPIView):
    
    serializer_class = BlogInteractionSerializer
    permission_classes = [IsAuthenticated]
    queryset = BlogInteraction.objects

    def get_object(self):
        user = self.request.user
        blog_id = self.request.data.get("blog")
        blog_interaction = BlogInteraction.objects.filter(user=user, blog=blog_id)
        if blog_interaction.exists():
            return blog_interaction[0]

        return None
    

    def put(self, request, *args, **kwargs):
        blog_interaction = self.get_object()
        if blog_interaction:
            return self.partial_update(request, *args, **kwargs)
        return self.create(request, *args)