import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import PopUpModal from './PopUpModal'

function TodoList({ todoList }) {
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)


  const handleViewItem = (item) => {
    setTodo(item)
    handleShow()

  }

  return (
    <>
      <Col>
        {todoList && todoList.map(todo =>
          <div key={todo.id}>

            <Card style={{ width: '100%' }}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ display: 'flex' }}>
                  <div>
                    {todo.title}
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Button variant="outline-primary">Edit</Button>{' '}
                    <Button
                      onClick={() => handleViewItem(todo)}
                      variant="outline-success"
                    >
                      view
                    </Button>{' '}
                    <Button variant="outline-danger">Delete</Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>

          </div>)}
        <PopUpModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          todo={todo}
        />
      </Col>
    </>
  )
}

export default TodoList
