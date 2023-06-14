// 必要なモジュールを読み込む
import React, { useEffect, useState } from 'react';

function Chat() {
  // WebSocketのインスタンスとメッセージのリストを格納するためのstateを作成
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // コンポーネントのマウント時に一度だけ実行されるuseEffectフックを定義
  useEffect(() => {
    // WebSocketを作成して接続
    const ws = new WebSocket('ws://localhost:3001');

    // 接続が開かれたときにメッセージをフェッチ
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'fetch' }));
    };

    // メッセージを受け取ったときにメッセージリストを更新
    ws.onmessage = message => {
      const { type, messages } = JSON.parse(message.data);
      if (type === 'update') {
        setMessages(messages);
      }
    };

    // WebSocketのインスタンスをstateに保存
    setWs(ws);

    // コンポーネントのアンマウント時にWebSocketをクローズ
    return () => {
      ws.close();
    };
  }, []);

  // 新しいメッセージをポストする関数を定義
  const postMessage = () => {
    ws.send(JSON.stringify({ type: 'post', text: newMessage }));
    setNewMessage('');
  };

  // コンポーネントの描画内容を定義
  return (
    <div>
      <ul>
        {/* メッセージリストを描画 */}
        {messages.map(message => <li key={message.id}>{message.text}</li>)}
      </ul>
      {/* 新しいメッセージを入力するフィールドと送信ボタンを描画 */}
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={postMessage}>Send</button>
    </div>
  );
}

// Chatコンポーネントをエクスポート
export default Chat;
