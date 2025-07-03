import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

const Input = ({ onSend, socket, roomId, currentUser }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emit send-message event
    socket.emit("community:send-message", {
      room: roomId,
      message,
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      created_at: new Date().toISOString(),
    });

    // Send immediately to parent for local state update
    onSend({
      text: message.trim(),
      sender: "me",
      createdAt: new Date().toISOString(),
    });

    setMessage("");
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("community:typing", {
      room: roomId,
      user: currentUser.name,
    });
  };

  return (
    <Form onSubmit={handleSend} className="p-3 border-top">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Start Typing ..."
          value={message}
          className="border-0"
          onChange={handleTyping}
        />
        <button type="submit" className="Btn rounded text-light mt-3">
          Send
        </button>
      </InputGroup>
    </Form>
  );
};

export default Input;
