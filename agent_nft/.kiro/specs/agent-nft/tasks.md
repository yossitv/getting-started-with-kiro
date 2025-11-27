# Implementation Plan

- [ ] 1. Set up project structure and core hooks
  - Create directory structure for agent-nft components and hooks
  - Set up TypeScript interfaces for ENS agent data
  - _Requirements: 1.1, 2.1_

- [ ] 1.1 Create useENSAgentData hook
  - Implement hook using viem to fetch "agent" text record from ENS
  - Handle loading, error, and success states
  - Add ENS domain format validation
  - _Requirements: 1.1, 1.3, 2.1, 2.3_

- [ ]* 1.2 Write property test for ENS domain format validation
  - **Property 1: ENS domain format validation**
  - **Validates: Requirements 1.1, 1.3**

- [ ]* 1.3 Write property test for agent record retrieval state management
  - **Property 2: Agent record retrieval state management**
  - **Validates: Requirements 2.4, 5.2**

- [ ]* 1.4 Write unit tests for useENSAgentData hook
  - Test initial state
  - Test loading state transitions
  - Test successful agent record fetch
  - Test error handling for invalid domains
  - Test error handling for missing agent records
  - _Requirements: 1.1, 1.3, 2.1, 2.3_

- [ ] 2. Create input and display components
  - Build reusable UI components for ENS domain input and agent record display
  - _Requirements: 1.2, 2.2, 5.1_

- [ ] 2.1 Implement AgentNFTInput component
  - Create input field for ENS domain
  - Add submit button with loading state
  - Implement input validation and error display
  - _Requirements: 1.1, 1.3, 5.1_

- [ ]* 2.2 Write unit tests for AgentNFTInput component
  - Test input value changes
  - Test submit button click
  - Test button disabled state during loading
  - Test empty input validation
  - _Requirements: 1.1, 5.1_

- [ ] 2.3 Implement AgentRecordDisplay component
  - Display ENS domain name
  - Display agent record content
  - Add "Start Conversation" button
  - Handle button disabled state during conversation start
  - _Requirements: 2.2, 2.4_

- [ ]* 2.4 Write unit tests for AgentRecordDisplay component
  - Test ENS domain display
  - Test agent record content display
  - Test conversation button click
  - Test button disabled state
  - _Requirements: 2.2, 2.4_

- [ ] 3. Implement Tavus conversation integration
  - Create components and logic for starting Tavus conversations with ENS agent context
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3.1 Create context seed builder utility
  - Implement function to construct context_seed from ENS domain and agent record
  - Ensure proper object structure for API
  - _Requirements: 3.1, 3.2_

- [ ]* 3.2 Write property test for context seed construction
  - **Property 3: Context seed construction**
  - **Validates: Requirements 3.1, 3.2**

- [ ] 3.3 Implement conversation start logic in main page
  - Call /api/conversations with context_seed
  - Handle API response and extract conversation_url
  - Implement error handling for API failures
  - _Requirements: 3.2, 3.3, 3.4_

- [ ]* 3.4 Write property test for conversation URL extraction
  - **Property 4: Conversation URL extraction**
  - **Validates: Requirements 3.4**

- [ ]* 3.5 Write property test for error message display
  - **Property 6: Error message display**
  - **Validates: Requirements 5.3**

- [ ]* 3.6 Write unit tests for conversation start logic
  - Test successful API call
  - Test error handling
  - Test conversation_url extraction
  - _Requirements: 3.2, 3.3, 3.4_

- [ ] 4. Create Tavus iframe embed component
  - Build component to display Tavus conversation in iframe
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 4.1 Implement TavusConversationEmbed component
  - Render iframe with conversation_url
  - Set allow attribute with required permissions
  - Set allowFullScreen attribute
  - _Requirements: 4.1, 4.2, 4.3_

- [ ]* 4.2 Write property test for iframe rendering
  - **Property 5: Iframe rendering with conversation URL**
  - **Validates: Requirements 4.1**

- [ ]* 4.3 Write unit tests for TavusConversationEmbed component
  - Test iframe src attribute
  - Test allow attribute value
  - Test allowFullScreen attribute
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 5. Build main Agent NFT page
  - Integrate all components into a cohesive page
  - _Requirements: 1.2, 2.2, 3.3, 4.1, 5.1, 5.2, 5.3, 5.4_

- [ ] 5.1 Create AgentNFTPage component
  - Set up page state management
  - Integrate useENSAgentData hook
  - Wire up AgentNFTInput component
  - Wire up AgentRecordDisplay component
  - Wire up TavusConversationEmbed component
  - Implement complete user flow from input to conversation
  - _Requirements: 1.2, 2.2, 3.3, 4.1, 5.1, 5.2, 5.3, 5.4_

- [ ] 5.2 Add styling with Tailwind CSS
  - Apply responsive design
  - Add loading indicators
  - Style error messages
  - Add animations and transitions
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]* 5.3 Write integration tests for complete flow
  - Test ENS lookup to agent display flow
  - Test agent display to conversation start flow
  - Test error scenarios (invalid domain, missing agent record, API failure)
  - _Requirements: 1.1, 1.3, 2.1, 2.3, 3.3, 5.3_

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
