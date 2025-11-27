interface TavusConversationEmbedProps {
  conversationUrl: string;
}

export const TavusConversationEmbed: React.FC<TavusConversationEmbedProps> = ({
  conversationUrl,
}) => {
  return (
    <div className="w-full max-w-4xl">
      <iframe
        src={conversationUrl}
        allow="camera; microphone; autoplay; clipboard-read; clipboard-write; display-capture"
        allowFullScreen
        className="w-full h-[600px] rounded-lg shadow-lg"
      />
    </div>
  );
};
