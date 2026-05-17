import { ChatIcon } from './icons';

export default function ChatBubble() {
  return (
    <button className="pv-chat" type="button" aria-label="Chat starten">
      <ChatIcon />
      <span>Chat</span>
    </button>
  );
}
