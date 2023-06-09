// Expressモジュールを読み込む
const express = require('express');
const cors = require('cors');

// Expressアプリケーションを作成
const app = express();

// CORS設定
app.use(cors()); 

// ExpressにJSONボディパーサミドルウェアを追加
// これにより、POSTリクエストのボディがJSONの場合に解析できる
app.use(express.json());

// チャットメッセージを保存するための配列を定義
// このサンプルではメモリ上に保存するため、サーバーが再起動されるとデータは失われる
let messages = [];

// メッセージIDを生成するための変数を定義
// 新たなメッセージが作成されるたびに1ずつ増加する
let id = 1;

// GET /messagesエンドポイントを定義
// チャットメッセージをクライアントに送信する
app.get('/messages', (req, res) => {
    res.json(messages);
});

// POST /messagesエンドポイントを定義
// 新たなチャットメッセージを受け取り、それをmessages配列に追加する
app.post('/messages', (req, res) => {
    // リクエストボディからメッセージテキストを取得し、新たなメッセージを作成
    const message = { id, text: req.body.text };

    // メッセージを配列に追加
    messages.push(message);

    // 次回のメッセージIDを作成
    id++;

    // 新たに作成したメッセージをレスポンスとして送信
    res.json(messages);
});

// Expressアプリケーションをポート3001で起動
app.listen(3001);
