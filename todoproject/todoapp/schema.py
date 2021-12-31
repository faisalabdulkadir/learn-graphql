import graphene
from graphene_django import DjangoObjectType
from .models import Todo


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ("id", "title", "description", "time", "date")


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.String())

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_todo_by_id(root, info, id):
        return Todo.objects.get(pk=id)


schema = graphene.Schema(query=Query)
