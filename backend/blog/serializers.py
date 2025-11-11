from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from .models import Category, Post

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class PostSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'


class PostCreateSerializer(serializers.ModelSerializer):
    categories = PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all()
    )

    class Meta:
        model = Post
        fields = ['title', 'content', 'categories']

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        post = Post.objects.create(**validated_data)
        post.categories.set(categories)
        return post
