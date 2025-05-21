import Avatar from "react-avatar";

interface ChatMessageType {
  position: string;
  avatar: string;
  name: string;
  children: React.ReactNode;
  time: string;
}

const ChatMessage = ({
  position,
  avatar,
  name,
  children,
  time,
}: ChatMessageType) => (
  <div className={`chat-message-${position} pb-4 ${position === "right" ? "me-3" : ""}`}>
    <div>
      <Avatar name={name} size="30" round />
      <div className="text-muted small text-nowrap mt-2">{time}</div>
    </div>
    
    <div
      className={`flex-shrink-1 bg-light rounded py-2 px-3 ${position === "right" ? "me-3" : "ms-3"
        }`}
    >
      <div className="fw-bold mb-1">{name}</div>
      {children}
    </div>
  </div>
);

export default ChatMessage