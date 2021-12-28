import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function TodoList({ data }) {
  return (
    <>
      <Col>
        {data && data.allTodo.map(todo =>
          <div key={todo.id}>

            <Card style={{ width: '100%' }}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{display: 'flex'}}>
                  <div>
                    {todo.title}
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Button variant="outline-primary">Edit</Button>{' '}
                    <Button variant="outline-success">view</Button>{' '}
                    <Button variant="outline-danger">Delete</Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>

          </div>)}

      </Col>
    </>
  )
}

export default TodoList
