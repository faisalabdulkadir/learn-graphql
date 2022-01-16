import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { UPDATE_TODO, CREATE_TODO } from '../GraphQL/Mutations'
import { ALL_TODO } from '../GraphQL/Queries'

function EditPage({ todo, showForm, handleClose, showAddForm, handleAddFormClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  const [updateTodo, { loading: isUpdatedLoad, error: updateError }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: ALL_TODO }]
  })

  const [createTodo, { loading: isAddedLoad, error: addedError }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: ALL_TODO }]
  })

  useEffect(() => {
    setTitle(todo.title)
    setDescription(todo.description)
    setTime(todo.time)
    setDate(todo.date)

  }, [todo.title, todo.description, todo.time, todo.date])

  if (isUpdatedLoad) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  if (updateError) return `Error! ${updateError.message}`;

  if (isAddedLoad) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  if (addedError) return `Error! ${addedError.message}`;

  const handleEdit = () => {
    onsubmit = (e) => {
      e.preventDefault()
    }
    updateTodo({
      variables: {
        id: todo.id,
        todoData: {
          title: title,
          description: description,
          time: time,
          date: date
        }
      }
    })
    handleClose()
  }

  const handleAdd = () => {
    onsubmit = (e) => {
      e.preventDefault()
    }
    createTodo({
      variables: {
        todoData: {
          title: title,
          description: description,
          time: time,
          date: date
        }
      }
    })
    setTitle('')
    setDescription('')
    setTime('')
    setDate('')
    handleAddFormClose()
  }

  return (
    <div>
      <Modal
        show={todo.id ? showForm : showAddForm}
        onHide={todo.id ? handleClose : handleAddFormClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {todo.id ? 'Edit Tasks' : 'Create Task'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title || ''}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description || ''}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="time"
                value={time || ''}
                onChange={e => setTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                value={date || ''}
                onChange={e => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={todo.id ? handleClose : handleAddFormClose}
          >
            Close
          </Button>
          {todo.id ? (
            <Button variant="primary" onClick={handleEdit}>
              Update Task
            </Button>
          ) : (
            <Button type='submit' variant="primary" onClick={handleAdd}>
              Add Task
            </Button>
          )}
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditPage
