import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Container, Col, Row, Form, ListGroup } from 'react-bootstrap'
import { Message, User } from '../typings/interfaces'
import { io } from 'socket.io-client'

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, { transports: ['websocket'] })
// this is the socket initialization
// socket -> it's our connection to the server

const Home = () => {
  const [userName, setUserName] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      // with on we're listening for an event
      console.log(socket.id)
    })

    socket.on('loggedin', () => {
      console.log("Now you're successfully logged in!")
      setIsLoggedIn(true)
    })
  }, [])

  const handleUsernameSubmit = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('setUsername', { username: userName })
    // with emit we're sending an event to the server
    // now the server is allowing us to send messages
    // and will emit an event for us! it's called 'loggedin'
  }

  // applications loads, I establish the connection with the server, I receive a "connect" event
  // I set my username and I send a 'setUsername' event to the server
  // If the server accepts it, it will store my user into the connected users list
  // at that point, after setting it, it will emit for me a 'loggedin' event
  // If me, the client, receives the loggedin event, it means now I'm officially logged in
  // also on the server, and now I'm allowed to send messages (because I have a username)

  // 1) how to send messages?
  // 2) how to gracefully disconnect

  return (
    <Container fluid className="px-4">
      <Row className="my-3" style={{ height: '95vh' }}>
        <Col md={10} className="d-flex flex-column justify-content-between">
          {/* MAIN CHAT VIEW */}
          <Form onSubmit={handleUsernameSubmit}>
            <Form.Control
              placeholder="Insert your name"
              value={userName}
              disabled={isLoggedIn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            />
          </Form>
          <ul>
            {chatHistory.map((message) => (
              <li key={message.id} className="my-2">
                <strong>{message.sender}</strong>
                <span className="mx-1"> | </span>
                <span>{message.text}</span>
                <span className="ml-2" style={{ fontSize: '0.7rem' }}>
                  {new Date(message.timestamp).toLocaleTimeString('en-US')}
                </span>
              </li>
            ))}
          </ul>
          <Form>
            <Form.Control
              placeholder="Write a message"
              value={currentMessage}
              disabled={!isLoggedIn}
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
