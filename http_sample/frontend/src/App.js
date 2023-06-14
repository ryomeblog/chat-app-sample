// ReactとそのhooksであるuseState, useEffectをインポートします。
import React, { useState, useEffect } from 'react';
// axiosというHTTP通信ライブラリをインポートします。
import axios from 'axios';

// Chatという名前のReactコンポーネントを定義します。
function Chat() {
    // messagesという状態変数を定義します。この変数はチャットメッセージのリストを保持します。
    const [messages, setMessages] = useState([]);
    // newMessageという状態変数を定義します。この変数は新しく送信するメッセージを保持します。
    const [newMessage, setNewMessage] = useState('');

    // fetchMessagesという非同期関数を定義します。この関数はサーバーからメッセージを取得します。
    const fetchMessages = async () => {
        // axiosを使用してメッセージを非同期に取得します。
        const { data: newMessages } = await axios.get(`http://localhost:3001/messages`);
        // 取得したメッセージでmessages状態変数を更新します。
        setMessages(newMessages);
    };

    // postMessageという非同期関数を定義します。この関数は新しいメッセージをサーバーに送信します。
    const postMessage = async () => {
        // axiosを使用してメッセージを非同期に送信します。
        const { data: message } = await axios.post('http://localhost:3001/messages', { text: newMessage });
        // 新しく作成されたメッセージでmessages状態変数を更新します。
        setMessages(message);
        // 新しいメッセージの入力欄をクリアします。
        setNewMessage('');
    };

    // useEffectフックを使用します。これにより、コンポーネントの最初のレンダリング時にfetchMessages関数を実行します。
    useEffect(() => {
        fetchMessages();
    }, []);

    // ここでHTML要素を返しています。これらはブラウザに描画されます。
    return (
        <div>
            <ul>
                {/* messages状態変数をmap関数でループし、それぞれのメッセージをリスト項目として描画します。 */}
                {messages.map(message => <li key={message.id}>{message.text}</li>)}
            </ul>
            {/* 入力欄と送信ボタンを表示します。入力欄の値はnewMessage状態変数と連動しています。 */}
            {/* 入力が変更されると、setNewMessageが呼び出されてnewMessageの値が更新されます。 */}
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            {/* "Send"ボタンがクリックされると、postMessage関数が呼び出されて新しいメッセージが送信されます。 */}
            <button onClick={postMessage}>Send</button>
        </div>
    );
}

// Chatコンポーネントをエクスポートします。他のファイルからインポートできるようになります。
export default Chat;
