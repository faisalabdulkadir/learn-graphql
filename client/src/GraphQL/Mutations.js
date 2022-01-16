import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
mutation UpdateTodo($id: ID, $todoData: TodoInput!) {
    updateTodo(id: $id, todoData: $todoData) {
      todo {
        id
        title
        time
        description
        date
      }
    }
  }  
`

export const CREATE_TODO = gql`
mutation CreateTodo($todoData: TodoInput!) {
  createTodo(todoData: $todoData) {
    todo {
      id
      title
      time
      description
      date
    }
  }
}
`