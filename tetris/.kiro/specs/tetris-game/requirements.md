# 要件ドキュメント

## はじめに

ブラウザで動作するシンプルなテトリスゲームを実装します。このゲームは、古典的なテトリスのルールに従い、プレイヤーがテトリミノ（テトリスのブロック）を操作して、完全な行を作成し、スコアを獲得することを目的とします。

## 用語集

- **Game System**: ブラウザで動作するテトリスゲームシステム全体
- **Tetromino**: テトリスで使用される4つの正方形で構成されるブロック（I、O、T、S、Z、J、Lの7種類）
- **Game Board**: テトリミノが配置される10列×20行のプレイエリア
- **Active Tetromino**: 現在プレイヤーが操作している落下中のテトリミノ
- **Locked Tetromino**: ゲームボードに固定されたテトリミノ
- **Complete Line**: ゲームボードの1行が全て埋まった状態
- **Game Over**: ゲームボードの最上部に新しいテトリミノを配置できない状態

## 要件

### 要件1

**ユーザーストーリー:** プレイヤーとして、テトリミノを操作したいので、戦略的に配置してラインを完成させることができる

#### 受入基準

1. WHEN プレイヤーが左矢印キーを押す THEN THE Game System SHALL Active Tetrominoを左に1マス移動する
2. WHEN プレイヤーが右矢印キーを押す THEN THE Game System SHALL Active Tetrominoを右に1マス移動する
3. WHEN プレイヤーが上矢印キーを押す THEN THE Game System SHALL Active Tetrominoを時計回りに90度回転する
4. WHEN プレイヤーが下矢印キーを押す THEN THE Game System SHALL Active Tetrominoの落下速度を加速する
5. WHEN 移動または回転が壁またはLocked Tetrominoと衝突する THEN THE Game System SHALL その操作を無効にし、Active Tetrominoを元の位置に保持する

### 要件2

**ユーザーストーリー:** プレイヤーとして、テトリミノが自動的に落下することを期待するので、継続的にゲームをプレイできる

#### 受入基準

1. WHEN ゲームが開始される THEN THE Game System SHALL 新しいActive Tetrominoをゲームボードの最上部中央に生成する
2. WHILE ゲームが進行中である THEN THE Game System SHALL Active Tetrominoを一定の時間間隔で1マス下に移動する
3. WHEN Active Tetrominoが下に移動できない THEN THE Game System SHALL そのテトリミノをLocked Tetrominoとして固定し、新しいActive Tetrominoを生成する
4. WHEN 新しいActive Tetrominoが生成位置に配置できない THEN THE Game System SHALL Game Over状態に遷移する

### 要件3

**ユーザーストーリー:** プレイヤーとして、完全なラインを消去してスコアを獲得したいので、ゲームの進行を楽しめる

#### 受入基準

1. WHEN 1つ以上のComplete Lineが形成される THEN THE Game System SHALL それらのラインを削除する
2. WHEN Complete Lineが削除される THEN THE Game System SHALL 削除されたラインの上にあるすべてのブロックを下に移動する
3. WHEN Complete Lineが削除される THEN THE Game System SHALL 削除されたライン数に基づいてスコアを増加する
4. WHEN 複数のComplete Lineが同時に削除される THEN THE Game System SHALL より高いスコアを付与する

### 要件4

**ユーザーストーリー:** プレイヤーとして、ゲームの状態を視覚的に確認したいので、適切な判断を下すことができる

#### 受入基準

1. THE Game System SHALL Game Boardを10列×20行のグリッドとして表示する
2. THE Game System SHALL Active Tetrominoを異なる色で表示する
3. THE Game System SHALL Locked Tetrominoを表示する
4. THE Game System SHALL 現在のスコアを表示する
5. THE Game System SHALL 次に出現するテトリミノをプレビュー表示する

### 要件5

**ユーザーストーリー:** プレイヤーとして、ゲームを開始、一時停止、リセットしたいので、自分のペースでプレイできる

#### 受入基準

1. WHEN プレイヤーがスタートボタンをクリックする THEN THE Game System SHALL ゲームを開始する
2. WHEN プレイヤーがスペースキーを押す THEN THE Game System SHALL ゲームを一時停止または再開する
3. WHEN ゲームが一時停止中である THEN THE Game System SHALL テトリミノの落下を停止し、キー入力を無効にする
4. WHEN Game Over状態になる THEN THE Game System SHALL ゲームオーバーメッセージを表示し、リスタートオプションを提供する

### 要件6

**ユーザーストーリー:** プレイヤーとして、7種類のテトリミノがランダムに出現することを期待するので、多様なゲームプレイを楽しめる

#### 受入基準

1. THE Game System SHALL 7種類のテトリミノ（I、O、T、S、Z、J、L）を実装する
2. WHEN 新しいテトリミノが生成される THEN THE Game System SHALL ランダムに1つのテトリミノタイプを選択する
3. THE Game System SHALL 各テトリミノタイプに固有の色を割り当てる
4. THE Game System SHALL 各テトリミノタイプの正しい形状を維持する
