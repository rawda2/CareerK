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
        backgroundColor: isMe ? '#7D8AC3':'#384579',
        color: isSystem ? '#fff' : '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}
    >
      {!isSystem && (
        <div className={`d-flex justify-content-between align-items-baseline ${isMe ? 'flex-row-reverse' : ''}`}>
          <small className=" text-light ">
            <strong>{isMe ? 'You' : sender}</strong>
          </small>
         
        </div>
      )}
      <div className={`${isMe ? 'text-end' : ''}`}>{text}</div>
      {isSystem && (
        <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>
          {timestamp}
        </small>
      )}
     
          {sender=="me"?<small className="text-light d-flex flex-row " style={{ fontSize: '0.7rem' }}>
            {timestamp}
          </small>:<small className="text-light d-flex flex-row-reverse " style={{ fontSize: '0.7rem' }}>
            {timestamp}
          </small>}
      
    </ListGroupItem>
  );
};

export default Message;