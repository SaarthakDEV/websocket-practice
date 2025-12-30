import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const user = "Billu";
  const [InputMessage, setInputMessage] = useState("")
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessages] = useState<Array<string>>([])
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Socket connection is established");
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      setMessages(prev => [...prev, message.data])
      console.log("Recieved message from socket client", message)
    }

    return () => socket.close();
  }, [])

  const sendMessage = () => {
    const payload = {
      user,
      text: InputMessage
    }
    let i = 0;
    const id = setInterval(() => {
      socket?.send(InputMessage);
      if(i == 10){
        clearInterval(id)
      }
      i++;
    }, 1000)
    setInputMessage("")
  }
  if(!socket){
    return <div>Loading...</div>
  }
  return (
    <>
    { message.map(msg => <div>{msg}</div>)}
    <input value={InputMessage} onChange={e => setInputMessage(e.target.value)} />
    <button type='submit' onClick={sendMessage}>Send</button>
    </>
  )
}

export default App
