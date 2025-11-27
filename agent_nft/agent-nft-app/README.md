# ENS Agent Chat

ENS Agent Chatは、ENSドメインのNFTに記録されたagentレコードを参照し、Tavusサービスを通じてユーザーのクローンAIと会話できる機能です。

## Features

- ENSドメインから"agent"テキストレコードを取得
- Tavus APIを使用してAIクローンとの会話を開始
- レスポンシブなUIデザイン

## Setup

1. 依存関係のインストール:
```bash
npm install
```

2. 環境変数の設定:
`.env.local`ファイルを作成し、以下を設定:
```
TAVUS_API_KEY=your_tavus_api_key_here
TAVUS_REPLICA_ID=your_replica_id_here
```

3. 開発サーバーの起動:
```bash
npm run dev
```

4. ブラウザで開く:
```
http://localhost:3000
```

## Usage

1. トップページから "Get Started" をクリック
2. ENSドメイン（例: vitalik.eth）を入力
3. "Fetch Agent" をクリックしてagentレコードを取得
4. "Start Conversation" をクリックしてAIとの会話を開始

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- viem (ENS interaction)
- Tavus API (AI conversation)

## Project Structure

```
src/
├── app/
│   ├── agent-nft/          # メインページ
│   ├── api/
│   │   └── conversations/  # Tavus API route
│   └── page.tsx            # ランディングページ
├── components/
│   └── agent-nft/          # UIコンポーネント
└── hooks/
    └── useENSAgentData.ts  # ENSデータ取得hook
```
