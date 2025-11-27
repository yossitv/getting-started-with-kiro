import { render, screen, fireEvent } from '@testing-library/react';
import { AgentNFTInput } from './AgentNFTInput';

describe('AgentNFTInput', () => {
  it('renders input field and submit button', () => {
    const mockOnSubmit = jest.fn();
    render(<AgentNFTInput onSubmit={mockOnSubmit} loading={false} error={null} />);
    
    expect(screen.getByLabelText(/ENS Domain/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fetch Agent/i })).toBeInTheDocument();
  });

  it('calls onSubmit with domain value when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<AgentNFTInput onSubmit={mockOnSubmit} loading={false} error={null} />);
    
    const input = screen.getByLabelText(/ENS Domain/i);
    const button = screen.getByRole('button', { name: /Fetch Agent/i });
    
    fireEvent.change(input, { target: { value: 'vitalik.eth' } });
    fireEvent.click(button);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('vitalik.eth');
  });

  it('disables button when loading', () => {
    const mockOnSubmit = jest.fn();
    render(<AgentNFTInput onSubmit={mockOnSubmit} loading={true} error={null} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Loading/i);
  });

  it('displays error message when error prop is provided', () => {
    const mockOnSubmit = jest.fn();
    render(<AgentNFTInput onSubmit={mockOnSubmit} loading={false} error="Invalid domain" />);
    
    expect(screen.getByText('Invalid domain')).toBeInTheDocument();
  });

  it('disables button when input is empty', () => {
    const mockOnSubmit = jest.fn();
    render(<AgentNFTInput onSubmit={mockOnSubmit} loading={false} error={null} />);
    
    const button = screen.getByRole('button', { name: /Fetch Agent/i });
    expect(button).toBeDisabled();
  });
});
