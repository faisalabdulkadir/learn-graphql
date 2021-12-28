import { gql } from '@apollo/client';

export const ALL_TODO = gql`
    query AllTodo {
        allTodo {
        id
        title
        description
        time
        date
        }
    }
`