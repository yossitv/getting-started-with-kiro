import { useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

export interface ENSAgentData {
  domain: string;
  agentRecord: string | null;
  avatar?: string | null;
  owner?: string;
}

export interface UseENSAgentDataReturn {
  data: ENSAgentData | null;
  loading: boolean;
  error: string | null;
  fetchAgentData: (domain: string) => Promise<void>;
}

const isValidENSDomain = (domain: string): boolean => {
  return /^[a-z0-9-]+(\.[a-z0-9-]+)*\.eth$/.test(domain.toLowerCase());
};

export const useENSAgentData = (): UseENSAgentDataReturn => {
  const [data, setData] = useState<ENSAgentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAgentData = async (domain: string) => {
    if (!isValidENSDomain(domain)) {
      setError('Invalid ENS domain format. Must be *.eth');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const client = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      const normalizedDomain = normalize(domain);
      
      const [agentRecord, avatar] = await Promise.all([
        client.getEnsText({
          name: normalizedDomain,
          key: 'agent',
        }),
        client.getEnsAvatar({
          name: normalizedDomain,
        }),
      ]);

      setData({
        domain: normalizedDomain,
        agentRecord: agentRecord || null,
        avatar: avatar || null,
      });

      if (!agentRecord) {
        setError('No agent record found for this domain');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ENS data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchAgentData };
};
