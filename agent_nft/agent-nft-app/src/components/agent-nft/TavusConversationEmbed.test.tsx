import { render } from '@testing-library/react';
import { TavusConversationEmbed } from './TavusConversationEmbed';

describe('TavusConversationEmbed', () => {
  const mockUrl = 'https://tavus.io/conversation/123';

  it('renders iframe with correct src', () => {
    const { container } = render(<TavusConversationEmbed conversationUrl={mockUrl} />);
    
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe(mockUrl);
  });

  it('sets correct allow attribute', () => {
    const { container } = render(<TavusConversationEmbed conversationUrl={mockUrl} />);
    
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    const allowAttr = iframe.getAttribute('allow');
    expect(allowAttr).toContain('camera');
    expect(allowAttr).toContain('microphone');
    expect(allowAttr).toContain('autoplay');
  });

  it('sets allowFullScreen attribute', () => {
    const { container } = render(<TavusConversationEmbed conversationUrl={mockUrl} />);
    
    const iframe = container.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.hasAttribute('allowfullscreen')).toBe(true);
  });
});
