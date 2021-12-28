import { useQuery } from '@apollo/client';
import { ALL_TODO } from './GraphQL/Queries';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import TodoList from './components/TodoList';
import Spinner from 'react-bootstrap/Spinner'

function App() {
  const { loading, error, data } = useQuery(ALL_TODO)


  if (loading) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  if (error) return `Error! ${error.message}`;


  return (
    <div>
      <Container fluid="md" style={{ width: '30rem' }}>
        <Row>
          <h1>Todo Items {' '}<Button variant="primary">Add Task</Button></h1>
          <TodoList data={data} />
        </Row>
      </Container>

    </div>
  );
}

export default App;
