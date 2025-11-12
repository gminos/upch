from rest_framework import viewsets, status
from rest_framework.response import Response
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


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
