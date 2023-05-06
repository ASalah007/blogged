
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Blog, BlogInteraction
from .serializers import BlogSerializer, BlogInteractionSerializer, BlogCommentSerializer, BlogStatsSerializer


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


class BlogCommentView(generics.ListCreateAPIView):
    serializer_class = BlogCommentSerializer

    def get_queryset(self):
        blog = get_object_or_404(Blog, pk=self.kwargs.get("pk"))
        return blog.blogcomment_set.all()
    

class BlogStatsView(generics.GenericAPIView):
    serializer_class = BlogStatsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.blog_set

    def get(self, request, pk):
        blog = self.get_object()
        blog_stats = blog.blogstats
        blog_stats.update_stats()
        ser = self.get_serializer(blog_stats)
        return Response(ser.data)