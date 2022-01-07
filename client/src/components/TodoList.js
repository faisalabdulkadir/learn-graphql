import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import PopUpModal from './PopUpModal'
import EditPage from './EditPage'

function TodoList({ todoList }) {
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [editTodo, setEditTodo] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const handleFormClose = () => setShowForm(false);
  const handleFormShow = () => setShowForm(true)


  const handleViewItem = (item) => {
    handleShow()
    setTodo(item)
  }

  const handleEditItem = (item) => {
    handleFormShow()
    setEditTodo(item)
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
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEditItem(todo)}
                    >
                      Edit
                    </Button>{' '}
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
        <EditPage
          show={showForm}
          handleClose={handleFormClose}
          todo={editTodo}
        />
      </Col>
    </>
  )
}

export default TodoList
