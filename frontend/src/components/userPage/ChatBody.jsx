import { useContext, useEffect, useRef } from 'react';
import styles from '../../css/userpage2.module.css';
import { SocketContext, ThemeDetails } from '../../hooks/ContextProvider';
import { FaSearch } from "react-icons/fa";
import { addReceiver, addSend } from '../../javaScript/messages';
import PropTypes from 'prop-types'

export const ChatBody = ({ messages, type }) => {
  let { chatBody } = ThemeDetails()
  const { body } = ThemeDetails()
  const { socket } = useContext(SocketContext)
  const chatBox = useRef(null)
  const inputBox = useRef(null)
  console.log(messages, type)

  const formSubmition = (e) => {
    e.preventDefault()
    let value = inputBox.current.value
    if (value.trim().length < 1) {
      inputBox.value = null
      return
    }
    addSend(value, chatBox, styles.send)
    socket.emit('send', value)
    inputBox.current.value = null
  }
  useEffect(() => {
    if (socket) {
      socket.on('receiver', (value) => {
        addReceiver(value, chatBox, styles.receiver)
        console.log(value)
      })
    }
  }, [socket])

  const classNames = {
    "assistant": styles.receiver,
    "user": styles.send,
    "system": styles.system
  }
  return (
    <div className={styles.chatBody} style={{ backgroundColor: chatBody }}>
      <div className={styles.chatBox} id="chatBox" ref={chatBox}>
        <div className={styles.receiver}>Hi, how are you</div>
        <div className={styles.send}>here the question</div>
        {messages && messages.map((ele, i) => {
          const className = classNames[ele.role]
          const styles = ele.role == "system " ? { color: body } : {}
          return <div key={i} className={className} style={styles}>{ele.content}</div>
        })}
      </div>
      <form className={styles.controlBox} id="sendForm" onSubmit={formSubmition}>
        <input className={styles.inputText} id="inputText" type="text" placeholder="Text Here" ref={inputBox} />
        <button type='submit' className={styles.submitBTN}><FaSearch /></button>
      </form>
    </div>
  )
}

ChatBody.propTypes = {
  messages: PropTypes.array
}