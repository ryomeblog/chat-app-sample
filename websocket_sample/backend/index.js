// 必要なモジュールを読み込む
const express = require('express'); // Express.jsのインポート
const http = require('http'); // HTTPサーバを作るためのモジュール
const WebSocket = require('ws'); // WebSocketを扱うためのモジュール

// Expressアプリを生成
const app = express();

// HTTPサーバを生成
const server = http.createServer(app);

// WebSocketサーバを生成
const wss = new WebSocket.Server({ server });

// メッセージを保存する配列とメッセージIDを生成するための変数を定義
let messages = [];
let id = 1;

// WebSocketの接続が開始した時のイベントハンドラを定義
wss.on('connection', ws => {
  // 新たなメッセージが受信された時のイベントハンドラを定義
  ws.on('message', message => {
    // 受信メッセージをパース
    const { type, text } = JSON.parse(message);
    
    // typeが'post'の場合、新たなメッセージを保存し、それを全クライアントに送信
    if (type === 'post') {
      const newMessage = { id, text };
      messages.push(newMessage);
      id++;
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'update', messages }));
        }
      });
    } 
    // typeが'fetch'の場合、既存のメッセージを要求元のクライアントに送信
    else if (type === 'fetch') {
      ws.send(JSON.stringify({ type: 'update', messages }));
    }
  });
});

// サーバを3001ポートで起動
server.listen(3001, function() {
  console.log('Listening on http://localhost:3001');
});
