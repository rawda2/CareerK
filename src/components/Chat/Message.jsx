// src/components/Message.jsx
import { ListGroupItem } from "react-bootstrap";
import { format } from 'date-fns';

const Message = ({ text, sender, isMe, isSystem }) => {
  // Generate a timestamp for the message
  const timestamp = format(new Date(), 'h:mm a');
  
  return (
    <ListGroupItem 
      className={`mb-2 rounded border-0 ${isSystem ? "text-center bg-light" : ""}`}
      style={{
        width: isSystem ? '100%' : 'fit-content',
        maxWidth: '75%',
        marginLeft: isMe ? 'auto' : '0',
        backgroundColor: isMe ? '#EDF1FF' : '#F9F9F9',
        color: isSystem ? '#6c757d' : 'inherit',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}
    >
      {!isSystem && (
        <div className={`d-flex justify-content-between align-items-baseline ${isMe ? 'flex-row-reverse' : ''}`}>
          <small className="text-muted">
            <strong>{isMe ? 'You' : sender}</strong>
          </small>
          <small className="text-muted me-3" style={{ fontSize: '0.7rem' }}>
            {timestamp}
          </small>
        </div>
      )}
      <div className={`${isMe ? 'text-end' : ''}`}>{text}</div>
      {isSystem && (
        <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>
          {timestamp}
        </small>
      )}
    </ListGroupItem>
  );
};

export default Message;