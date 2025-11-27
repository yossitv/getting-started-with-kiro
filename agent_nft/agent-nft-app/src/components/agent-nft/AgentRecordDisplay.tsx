import { ENSAgentData } from '@/hooks/useENSAgentData';

interface AgentRecordDisplayProps {
  data: ENSAgentData;
  onStartConversation: () => void;
  loading: boolean;
}

export const AgentRecordDisplay: React.FC<AgentRecordDisplayProps> = ({
  data,
  onStartConversation,
  loading,
}) => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{data.domain}</h2>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Agent Record:</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{data.agentRecord}</p>
        </div>
      </div>
      <button
        onClick={onStartConversation}
        disabled={loading}
        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Starting Conversation...' : 'Start Conversation'}
      </button>
    </div>
  );
};
