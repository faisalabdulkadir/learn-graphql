import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { UPDATE_TODO } from '../GraphQL/Mutations'
import { ALL_TODO } from '../GraphQL/Queries'

function EditPage({ todo, show, handleClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  const [updateTodo, { data, loading, error }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: ALL_TODO }]
  })

  useEffect(() => {
    setTitle(todo.title)
    setDescription(todo.description)
    setTime(todo.time)
    setDate(todo.date)

  }, [todo.title, todo.description, todo.time, todo.date])

  if (loading) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  if (error) return `Error! ${error.message}`;

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

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tasks</Modal.Title>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Update Changes
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditPage
