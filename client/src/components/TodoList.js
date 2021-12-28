import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function TodoList({ data }) {
  return (
    <>
      <Col>
        {data && data.allTodo.map(todo =>
          <h5 key={todo.id}>{todo.title}
            <Col>
              <Button variant="outline-primary">Edit</Button>{' '}
              <Button variant="outline-success">view</Button>{' '}
              <Button variant="outline-danger">Delete</Button>
              <hr />
            </Col>
          </h5>)}

      </Col>
    </>
  )
}

export default TodoList
