import graphene
from graphene_django import DjangoObjectType
from .models import Todo

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ("id", "title", "description", "time", "date")


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)

    def resolve_all_todo(root, info):
        return Todo.objects.all()



schema = graphene.Schema(query=Query)
