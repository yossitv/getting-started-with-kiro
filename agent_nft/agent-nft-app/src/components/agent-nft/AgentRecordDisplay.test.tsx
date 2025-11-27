import { render, screen, fireEvent } from '@testing-library/react';
import { AgentRecordDisplay } from './AgentRecordDisplay';
import { ENSAgentData } from '@/hooks/useENSAgentData';

describe('AgentRecordDisplay', () => {
  const mockData: ENSAgentData = {
    domain: 'vitalik.eth',
    agentRecord: 'I am Vitalik, creator of Ethereum',
  };

  it('renders domain name and agent record', () => {
    const mockOnStart = jest.fn();
    render(<AgentRecordDisplay data={mockData} onStartConversation={mockOnStart} loading={false} />);
    
    expect(screen.getByText('vitalik.eth')).toBeInTheDocument();
    expect(screen.getByText('I am Vitalik, creator of Ethereum')).toBeInTheDocument();
  });

  it('calls onStartConversation when button is clicked', () => {
    const mockOnStart = jest.fn();
    render(<AgentRecordDisplay data={mockData} onStartConversation={mockOnStart} loading={false} />);
    
    const button = screen.getByRole('button', { name: /Start Conversation/i });
    fireEvent.click(button);
    
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    const mockOnStart = jest.fn();
    render(<AgentRecordDisplay data={mockData} onStartConversation={mockOnStart} loading={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Starting Conversation/i);
  });
});
