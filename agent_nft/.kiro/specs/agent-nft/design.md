# Design Document

## Overview

Agent NFTは、ENSドメインに記録されたagentレコードを取得し、そのコンテキストを使ってTavusのAIクローンと会話できるWebアプリケーションです。既存のDisplayEnsProfileコンポーネント（ENSデータ取得）とTavus統合コード（会話API）を活用し、新しいページとコンポーネントを追加して実装します。

技術スタック：
- Next.js (App Router)
- TypeScript
- viem (Ethereum interactions)
- Tavus API (AI conversation)
- React hooks

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Agent NFT Page                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │ ENS Input    │  │ Agent Display│  │ Tavus Iframe│ │ │
│  │  │ Component    │  │ Component    │  │ Component   │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/JSON
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API Routes                                            │ │
│  │  /api/conversations (existing)                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────┐
│  Ethereum (via viem)     │  │  Tavus API           │
│  - ENS text records      │  │  - Create conversation│
└──────────────────────────┘  └──────────────────────┘
```

### Data Flow

1. ユーザーがENSドメイン名を入力
2. useENSDataフックがviemを使ってブロックチェーンから"agent"レコードを取得
3. agentレコードが存在する場合、表示して会話開始ボタンを有効化
4. ユーザーが会話開始ボタンをクリック
5. フロントエンドが/api/conversationsにPOSTリクエスト（context_seedにENSデータを含む）
6. サーバーがcontext_seedからconversational_contextを構築
7. サーバーがTavus APIを呼び出してconversation_urlを取得
8. フロントエンドがiframeでconversation_urlを表示
9. ユーザーがTavusインターフェースで会話

## Components and Interfaces

### Frontend Components

#### 1. AgentNFTPage (新規作成)
メインページコンポーネント

**Location**: `src/app/agent-nft/page.tsx`

**State**:
```typescript
interface PageState {
  ensDomain: string;              // 入力されたENSドメイン
  agentRecord: string | null;     // 取得したagentレコード
  loading: boolean;               // ENSデータ取得中
  error: string | null;           // エラーメッセージ
  conversationUrl: string | null; // Tavusの会話URL
  startingConversation: boolean;  // 会話開始処理中
}
```

**Props**: なし（ページコンポーネント）

**Responsibilities**:
- ENSドメイン入力の管理
- useENSAgentDataフックの呼び出し
- 会話開始処理の実行
- 子コンポーネントの配置とデータ受け渡し

#### 2. AgentNFTInput (新規作成)
ENSドメイン入力コンポーネント

**Location**: `src/components/agent-nft/AgentNFTInput.tsx`

**Props**:
```typescript
interface AgentNFTInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled?: boolean;
}
```

**Responsibilities**:
- ENSドメイン名の入力フィールド表示
- 検索ボタンの表示と無効化制御
- フォーム送信処理

#### 3. AgentRecordDisplay (新規作成)
取得したagentレコードを表示するコンポーネント

**Location**: `src/components/agent-nft/AgentRecordDisplay.tsx`

**Props**:
```typescript
interface AgentRecordDisplayProps {
  ensDomain: string;
  agentRecord: string;
  onStartConversation: () => void;
  starting: boolean;
}
```

**Responsibilities**:
- ENSドメイン名の表示
- agentレコードの内容表示
- 会話開始ボタンの表示

#### 4. TavusConversationEmbed (新規作成)
Tavus会話iframeを表示するコンポーネント

**Location**: `src/components/agent-nft/TavusConversationEmbed.tsx`

**Props**:
```typescript
interface TavusConversationEmbedProps {
  conversationUrl: string;
}
```

**Responsibilities**:
- iframeの表示
- 適切なallow属性とallowFullScreenの設定

### Custom Hooks

#### useENSAgentData (新規作成)
ENSドメインからagentレコードを取得するフック

**Location**: `src/hooks/useENSAgentData.ts`

**Interface**:
```typescript
interface UseENSAgentDataResult {
  agentRecord: string | null;
  loading: boolean;
  error: string | null;
  fetchAgentRecord: (domain: string) => Promise<void>;
}

function useENSAgentData(): UseENSAgentDataResult;
```

**Implementation Details**:
- viemのcreatePublicClientを使用
- getEnsText({ name: domain, key: "agent" })でagentレコードを取得
- エラーハンドリング（ドメインが存在しない、レコードが存在しない等）

### Backend API

#### /api/conversations (既存)
Tavus会話を開始するAPIエンドポイント（既存のものを利用）

**Method**: POST

**Request Body**:
```typescript
interface ConversationRequestBody {
  context_seed: {
    ensDomain: string;
    agentRecord: string;
  };
  replica_id?: string;
  persona_id?: string;
  audio_only?: boolean;
  conversation_name?: string;
  custom_greeting?: string;
  test_mode?: boolean;
  language?: string;
}
```

**Response**:
```typescript
interface ConversationResponse {
  conversation_url: string;
}
```

**Error Response**:
```typescript
interface ErrorResponse {
  error: string;
}
```

## Data Models

### ENS Agent Context Seed
```typescript
interface ENSAgentContextSeed {
  ensDomain: string;      // ENSドメイン名（例: "vitalik.eth"）
  agentRecord: string;    // agentレコードの内容
}
```

### ENS Text Record
```typescript
interface ENSTextRecord {
  key: string;    // レコードのキー（"agent"）
  value: string;  // レコードの値
}
```

### Tavus Conversation Request
```typescript
interface TavusConversationRequest {
  replica_id?: string;
  persona_id?: string;
  audio_only?: boolean;
  conversation_name?: string;
  conversational_context: string;  // context_seedから構築
  custom_greeting?: string;
  test_mode?: boolean;
  properties?: {
    language?: string;
    [key: string]: unknown;
  };
}
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: ENS domain format validation

*For any* input string, the system should accept strings ending with ".eth" and reject all other formats, displaying an error message for invalid formats.

**Validates: Requirements 1.1, 1.3**

### Property 2: Agent record retrieval state management

*For any* ENS domain lookup, while the agent record is being fetched, the loading state should be true, and the conversation start button should be disabled. When the fetch completes successfully, loading should be false and the button should be enabled.

**Validates: Requirements 2.4, 5.2**

### Property 3: Context seed construction

*For any* ENS domain name and agent record value, when creating a context_seed for the Tavus API, the resulting object should contain both the ensDomain and agentRecord fields with the correct values.

**Validates: Requirements 3.1, 3.2**

### Property 4: Conversation URL extraction

*For any* valid Tavus API response containing a conversation_url field, the system should correctly extract and store the URL value.

**Validates: Requirements 3.4**

### Property 5: Iframe rendering with conversation URL

*For any* conversation URL received from Tavus, the system should render an iframe element with the src attribute set to that URL.

**Validates: Requirements 4.1**

### Property 6: Error message display

*For any* error that occurs during ENS lookup or Tavus API calls, the system should display an error message to the user and set the error state.

**Validates: Requirements 5.3**

## Error Handling

### ENS Domain Validation Errors
- **Invalid format**: ドメインが".eth"で終わらない場合
- **Empty input**: 入力が空の場合
- **Error message**: "有効なENSドメイン名を入力してください（例: vitalik.eth）"

### Blockchain Query Errors
- **Network error**: ブロックチェーンへの接続に失敗した場合
- **Domain not found**: ENSドメインが存在しない場合
- **No agent record**: agentレコードが設定されていない場合
- **Error messages**:
  - "ブロックチェーンへの接続に失敗しました。もう一度お試しください。"
  - "このENSドメインは存在しません。"
  - "このENSドメインにはagentレコードが設定されていません。"

### Tavus API Errors
- **API connection error**: Tavus APIへの接続に失敗した場合
- **Invalid response**: レスポンスにconversation_urlが含まれていない場合
- **Authentication error**: API認証に失敗した場合
- **Error messages**:
  - "会話の開始に失敗しました。もう一度お試しください。"
  - "Tavus APIからの応答が不正です。"
  - "API認証に失敗しました。管理者に連絡してください。"

### Error Recovery
- すべてのエラーで、ユーザーは再試行できる
- エラーメッセージは具体的で、次のアクションを示唆する
- ローディング状態は適切にリセットされる

## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Unit Test Coverage**:

1. **ENSAgentInput Component**
   - 入力値の変更が正しくonChangeを呼び出す
   - 送信ボタンクリックがonSubmitを呼び出す
   - loading中はボタンが無効化される
   - 空の入力では送信できない

2. **AgentRecordDisplay Component**
   - ENSドメイン名が正しく表示される
   - agentレコードの内容が正しく表示される
   - 会話開始ボタンクリックがonStartConversationを呼び出す
   - starting中はボタンが無効化される

3. **TavusConversationEmbed Component**
   - conversationUrlがiframeのsrcに設定される
   - allow属性が正しく設定される
   - allowFullScreen属性がtrueに設定される

4. **useENSAgentData Hook**
   - 初期状態が正しい（loading: false, error: null, agentRecord: null）
   - fetchAgentRecord呼び出し時にloading状態が変わる
   - 成功時にagentRecordが設定される
   - エラー時にerrorが設定される

5. **API Route /api/conversations**
   - context_seedが正しくconversational_contextに変換される
   - Tavus APIレスポンスが正しく返される
   - エラー時に適切なステータスコードとメッセージが返される

### Property-Based Testing

**Framework**: fast-check (JavaScript/TypeScript property-based testing library)

**Configuration**: 各プロパティテストは最低100回の反復を実行

**Property Test Coverage**:

1. **Property 1: ENS domain format validation**
   - **Feature: agent-nft, Property 1: ENS domain format validation**
   - Generator: 任意の文字列（.ethで終わるものと終わらないもの）
   - Assertion: .ethで終わる文字列は受け入れられ、それ以外はエラーになる

2. **Property 2: Agent record retrieval state management**
   - **Feature: agent-nft, Property 2: Agent record retrieval state management**
   - Generator: 任意のENSドメイン名
   - Assertion: fetch中はloading=true、完了後はloading=false、成功時はボタンが有効

3. **Property 3: Context seed construction**
   - **Feature: agent-nft, Property 3: Context seed construction**
   - Generator: 任意のENSドメイン名と任意のagentレコード文字列
   - Assertion: 生成されたcontext_seedに両方のフィールドが正しく含まれる

4. **Property 4: Conversation URL extraction**
   - **Feature: agent-nft, Property 4: Conversation URL extraction**
   - Generator: conversation_urlフィールドを含む任意のオブジェクト
   - Assertion: URLが正しく抽出される

5. **Property 5: Iframe rendering with conversation URL**
   - **Feature: agent-nft, Property 5: Iframe rendering with conversation URL**
   - Generator: 任意のURL文字列
   - Assertion: iframeのsrc属性が生成されたURLと一致する

6. **Property 6: Error message display**
   - **Feature: agent-nft, Property 6: Error message display**
   - Generator: 任意のエラーメッセージ文字列
   - Assertion: エラーが発生した時、error状態が設定され、メッセージが表示される

### Integration Testing

統合テストは、実際のブロックチェーンとTavus APIを使用せず、モックを使用して以下をテストします：

1. **ENS lookup → Agent display → Conversation start flow**
   - ENSドメイン入力から会話開始までの完全なフロー
   - 各ステップでの状態遷移
   - エラーハンドリング

2. **Error scenarios**
   - 無効なENSドメイン入力
   - agentレコードが存在しないケース
   - Tavus API呼び出し失敗

## Implementation Notes

### Reusing Existing Code

1. **DisplayEnsProfile component**: 参考にするが、agentレコード専用の軽量版を作成
2. **useENSData hook**: パターンを参考に、useENSAgentDataを作成
3. **Tavus API integration**: 既存の/api/conversationsエンドポイントをそのまま利用
4. **Context builder**: 既存のresolveContextBuilder()を利用してcontext_seedを処理

### Environment Variables

```bash
# Tavus API
TAVUS_API_KEY=your_tavus_api_key
TAVUS_DEFAULT_REPLICA_ID=replica_xxx
TAVUS_DEFAULT_PERSONA_ID=persona_xxx

# Context Builder (optional)
CONTEXT_PROVIDER=local  # or "openai" or "dedalus"
OPENAI_API_KEY=your_openai_key  # if using openai
OPENAI_CONTEXT_MODEL=gpt-4o-mini
```

### Styling

- Tailwind CSSを使用（既存プロジェクトと同じ）
- レスポンシブデザイン
- ダークモード対応（既存のスタイルに合わせる）
- グラデーション、アニメーション効果を活用

### Performance Considerations

1. **ENS queries**: viemのキャッシュ機能を活用
2. **Debouncing**: ENSドメイン入力にデバウンスを適用（500ms）
3. **Error retry**: 自動リトライは実装せず、ユーザーが手動で再試行
4. **Iframe loading**: iframeのloading="lazy"は使用しない（即座に表示したい）

### Security Considerations

1. **Input validation**: ENSドメイン名のサニタイゼーション
2. **XSS prevention**: React のデフォルトのエスケープに依存
3. **API keys**: 環境変数で管理、クライアントに露出しない
4. **CORS**: Tavus iframeは適切なCSPヘッダーで保護
