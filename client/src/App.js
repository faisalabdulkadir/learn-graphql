import { useQuery } from '@apollo/client';
import { ALL_TODO } from './GraphQL/Queries';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function App() {
  const { loading, error, data } = useQuery(ALL_TODO)


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  return (
    <div>
      <Container fluid="md" style={{ width: '30rem' }}>
        <Row>
          <h1>Todo Items {' '}<Button variant="primary">Add Task</Button></h1>
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
        </Row>
      </Container>

    </div>
  );
}

export default App;
