# Requirements Document

## Introduction

ENS Agent Chatは、ENSドメインのNFTに記録されたagentレコードを参照し、Tavusサービスを通じてユーザーのクローンAIと会話できる機能です。ファンが推しのクローンと対話したり、名刺代わりに自分のクローンを提供したりする、未来の推し活を実現します。既存のDisplayEnsProfileコンポーネントとTavus統合コードを活用して実装します。

## Glossary

- **ENS (Ethereum Name Service)**: イーサリアムブロックチェーン上のドメイン名システム
- **Agent Record**: ENSドメインに記録されたテキストレコード（キー: "agent"）で、AIエージェントのコンテキスト情報を含む
- **Tavus**: クローンAIと会話できるサービス。conversation_urlを返すAPIを提供
- **System**: ENS Agent Chat アプリケーション
- **User**: アプリケーションを使用するファン、または自分のクローンを提供する人
- **Context Seed**: Tavus APIに渡すコンテキスト情報を構築するための元データ
- **Conversational Context**: Tavus APIに渡される最終的なコンテキスト文字列

## Requirements

### Requirement 1

**User Story:** As a user, I want to select an ENS domain, so that I can view its information and interact with the associated agent.

#### Acceptance Criteria

1. WHEN a user enters an ENS domain name, THE System SHALL validate the domain format
2. WHEN a valid ENS domain is submitted, THE System SHALL retrieve and display the domain's basic information
3. WHEN an invalid ENS domain is entered, THE System SHALL display an error message and prevent further processing
4. WHEN the domain information is displayed, THE System SHALL show the owner address and registration details

### Requirement 2

**User Story:** As a user, I want the system to retrieve the agent record from an ENS domain, so that I can access the AI agent's context information.

#### Acceptance Criteria

1. WHEN an ENS domain is selected, THE System SHALL query the blockchain for the text record with key "agent" using viem library
2. WHEN the agent record exists, THE System SHALL display the record content to the user
3. WHEN the agent record does not exist, THE System SHALL display a message indicating no agent is configured for this domain
4. WHEN the agent record is retrieved successfully, THE System SHALL enable the conversation start button

### Requirement 3

**User Story:** As a user, I want the system to pass the agent record to Tavus as context, so that the AI clone can respond based on the ENS domain owner's information.

#### Acceptance Criteria

1. WHEN the user starts a conversation, THE System SHALL create a context_seed object containing the ENS domain name and agent record
2. WHEN calling the Tavus API, THE System SHALL pass the context_seed to the /api/conversations endpoint
3. WHEN the Tavus API call fails, THE System SHALL display an error message with details
4. WHEN the Tavus API returns successfully, THE System SHALL extract the conversation_url from the response

### Requirement 4

**User Story:** As a user, I want to see the Tavus interface in an iframe and start a conversation, so that I can interact with the AI clone.

#### Acceptance Criteria

1. WHEN the conversation_url is received, THE System SHALL render an iframe element with the URL
2. WHEN rendering the iframe, THE System SHALL set allow attribute to "camera; microphone; autoplay; clipboard-read; clipboard-write; display-capture"
3. WHEN rendering the iframe, THE System SHALL set allowFullScreen attribute to true
4. WHEN the iframe is displayed, THE System SHALL allow the user to interact with the Tavus conversation interface directly

### Requirement 5

**User Story:** As a user, I want a smooth and intuitive user experience, so that I can easily navigate through the process of selecting an ENS domain and chatting with the agent.

#### Acceptance Criteria

1. WHEN the application loads, THE System SHALL display a clear interface for ENS domain input
2. WHEN processing requests, THE System SHALL show loading indicators to inform the user of progress
3. WHEN errors occur, THE System SHALL display user-friendly error messages with suggested actions
4. WHEN transitioning between steps, THE System SHALL maintain visual continuity and clear navigation
