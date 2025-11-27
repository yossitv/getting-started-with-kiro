'use client';

import { useState } from 'react';
import { useENSAgentData } from '@/hooks/useENSAgentData';
import { AgentNFTInput } from '@/components/agent-nft/AgentNFTInput';
import { AgentRecordDisplay } from '@/components/agent-nft/AgentRecordDisplay';
import { TavusConversationEmbed } from '@/components/agent-nft/TavusConversationEmbed';

export default function AgentNFTPage() {
  const { data, loading, error, fetchAgentData } = useENSAgentData();
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [conversationError, setConversationError] = useState<string | null>(null);

  const handleStartConversation = async () => {
    if (!data) return;

    setConversationLoading(true);
    setConversationError(null);

    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context_seed: {
            domain: data.domain,
            agent_record: data.agentRecord,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to start conversation');
      }

      const result = await response.json();
      setConversationUrl(result.conversation_url);
    } catch (err) {
      setConversationError(err instanceof Error ? err.message : 'Failed to start conversation');
    } finally {
      setConversationLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">ENS Agent Chat</h1>
          <p className="text-gray-600">Connect with AI agents through ENS domains</p>
        </div>

        {!data && !conversationUrl && (
          <div className="flex justify-center">
            <AgentNFTInput
              onSubmit={fetchAgentData}
              loading={loading}
              error={error}
            />
          </div>
        )}

        {data && !conversationUrl && (
          <div className="flex flex-col items-center space-y-4">
            <AgentRecordDisplay
              data={data}
              onStartConversation={handleStartConversation}
              loading={conversationLoading}
            />
            {conversationError && (
              <div className="text-red-500 text-sm">{conversationError}</div>
            )}
          </div>
        )}

        {conversationUrl && (
          <div className="flex justify-center">
            <TavusConversationEmbed conversationUrl={conversationUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
