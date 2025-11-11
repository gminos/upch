from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Post, Category
from .serializers import PostSerializer, PostCreateSerializer, CategorySerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-id')

    def get_serializer_class(self):
        # 🔹 Usa un serializer diferente al crear para aceptar IDs de categorías
        if self.action == 'create':
            return PostCreateSerializer
        return PostSerializer

    def create(self, request, *args, **kwargs):
        """
        Sobrescribimos create() para usar PostCreateSerializer al validar y guardar,
        pero devolvemos la respuesta usando PostSerializer (con categorías anidadas).
        """
        # 🔸 Validar y guardar usando el serializer de creación
        create_serializer = PostCreateSerializer(data=request.data)
        create_serializer.is_valid(raise_exception=True)
        post = create_serializer.save()

        # 🔸 Serializar el post recién creado con los datos completos
        read_serializer = PostSerializer(post, context=self.get_serializer_context())

        return Response(read_serializer.data, status=status.HTTP_201_CREATED)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
