import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function PopUpModal({ show, todo, handleClose }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{todo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{todo.description} </p>
            <span>Date: {todo.date} </span>
            <blockquote>Time: {todo.time}</blockquote>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PopUpModal
