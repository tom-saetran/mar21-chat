import { useState, ChangeEvent } from 'react'
import { Container, Col, Row, Form, ListGroup } from 'react-bootstrap'
import { User } from '../typings/interfaces'

const Home = () => {
  const [userName, setUserName] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  //   const [chatHistory, setChatHistory] = useState

  return (
    <Container fluid className="px-4">
      <Row className="my-3" style={{ height: '95vh' }}>
        <Col md={10} className="d-flex flex-column justify-content-between">
          {/* MAIN CHAT VIEW */}
          <Form>
            <Form.Control
              placeholder="Insert your name"
              value={userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            />
          </Form>
          <p>here goes the messages</p>
          <Form>
            <Form.Control
              placeholder="Write a message"
              value={currentMessage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentMessage(e.target.value)}
            />
          </Form>
        </Col>
        <Col md={2} style={{ borderLeft: '2px solid black' }}>
          {/* CONNECTED USERS */}
          <div>Connected users</div>
          <ListGroup>
            {onlineUsers.map((user) => (
              <ListGroup.Item key={user.id}>{user.userName}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
