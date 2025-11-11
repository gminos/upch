from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self) -> str:
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    categories = models.ManyToManyField("Category", related_name="posts")

    def __str__(self) -> str:
        return self.title
