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
        <div className="flex items-start gap-4 mb-4">
          {data.avatar && (
            <img 
              src={data.avatar} 
              alt={`${data.domain} avatar`}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{data.domain}</h2>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Agent Record:</h3>
          {data.agentRecord ? (
            <p className="text-gray-600 whitespace-pre-wrap">{data.agentRecord}</p>
          ) : (
            <p className="text-gray-400 italic">No agent record set for this domain</p>
          )}
        </div>
      </div>
      {data.agentRecord && (
        <button
          onClick={onStartConversation}
          disabled={loading}
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Starting Conversation...' : 'Start Conversation'}
        </button>
      )}
    </div>
  );
};
