
import  { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const Input = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  return (
    <Form onSubmit={handleSend} className="p-3  border-top">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Start Typing ..."
          value={message}
          className=" border-0"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="Btn rounded text-light mt-3">
          Send
        </button>
      </InputGroup>
    </Form>
  );
};

export default Input;
