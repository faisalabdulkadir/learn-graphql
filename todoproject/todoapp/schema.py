import graphene
from graphene_django import DjangoObjectType
from .models import Todo


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ("id", "title", "description", "time", "date")


class TodoInput(graphene.InputObjectType):
    title = graphene.String()
    description = graphene.String()
    time = graphene.Time()
    date = graphene.Date()


class TodoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        todo_data = TodoInput(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, id, todo_data):
        todo = Todo.objects.get(pk=id)
        todo.title = todo_data.title
        if(todo_data.description is not None):
            todo.description = todo_data.description
        if(todo_data.time is not None):
            todo.time = todo_data.time
        if (todo_data.date is not None):
            todo.date = todo_data.date
        todo.save()

        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.String())

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_todo_by_id(root, info, id):
        return Todo.objects.get(pk=id)


schema = graphene.Schema(query=Query, mutation=Mutation)
