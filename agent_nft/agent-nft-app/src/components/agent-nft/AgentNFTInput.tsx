import { useState } from 'react';

interface AgentNFTInputProps {
  onSubmit: (domain: string) => void;
  loading: boolean;
  error: string | null;
}

export const AgentNFTInput: React.FC<AgentNFTInputProps> = ({ onSubmit, loading, error }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onSubmit(domain.trim());
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ens-domain" className="block text-sm font-medium mb-2">
            ENS Domain
          </label>
          <input
            id="ens-domain"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="vitalik.eth"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading || !domain.trim()}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Fetch Agent'}
        </button>
      </form>
    </div>
  );
};
