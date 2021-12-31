import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_TODO } from './GraphQL/Queries';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import TodoList from './components/TodoList';
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'


function App() {
  const { loading, error, data } = useQuery(ALL_TODO)
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    if (data) {
      setTodoList(data.allTodo)
    }
  }, [data])


  if (loading) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  if (error) return `Error! ${error.message}`;


  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>

      <Container fluid="md" style={{ width: '40rem' }}>
        <Row>
          <Col>
            <Card.Header style={{ display: 'flex' }}>
              <div style={{ fontWeight: 'bolder', fontSize: 'x-large' }}>
                Todo Items
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Button variant="primary">Add Task</Button>
              </div>
            </Card.Header>

          </Col>
        </Row>
        <Row>
          <TodoList todoList={todoList} />
        </Row>
      </Container>

    </div>
  );
}

export default App;
