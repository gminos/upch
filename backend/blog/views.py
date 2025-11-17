from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import Post, Category
from .serializers import PostSerializer, PostCreateSerializer, CategorySerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-id')

    def get_serializer_class(self):
        if self.action == 'create':
            return PostCreateSerializer
        return PostSerializer

    def create(self, request, *args, **kwargs):
        create_serializer = PostCreateSerializer(data=request.data)
        create_serializer.is_valid(raise_exception=True)
        post = create_serializer.save()
        read_serializer = PostSerializer(post, context=self.get_serializer_context())
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        Post.objects.filter(id=post.id).update(likes=F('likes') + 1)
        post.refresh_from_db()
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        post = self.get_object()
        Post.objects.filter(id=post.id).update(likes=F('likes') - 1)
        post.refresh_from_db()
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
