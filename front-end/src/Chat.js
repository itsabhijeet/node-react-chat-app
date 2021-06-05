import React, { useEffect, useState, useMemo } from 'react';

const Chat = () => {

    const [state, setState] = useState({
        name: "",
        currentMessage: ""
    });

    const [messages, setMessages] = useState([]);

    const ws = useMemo(() => new WebSocket("ws://localhost:5000"), []);


    useEffect(() => {
        ws.onopen = () => console.log("Connection Open");
        ws.onmessage = (event) => {
            console.log(messages);
            setMessages(prev => [ ...prev, event.data.split(",")]);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = () => {
        ws.send([state.name, state.currentMessage]);
        setState({ ...state, currentMessage: ""});
    }

    return (
        <div>
            <label> Name: </label>
            <input type="text" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
            <h3>Messages: </h3>
            { messages.length > 0 
                ? (messages.map(( msg, idx) => <p key={idx}> <span>{msg[0]}: </span>{msg[1]}</p>) )
                : <p>No messages !</p>
            }

            <input type="text" value={state.currentMessage} onChange={(e) => setState({...state, currentMessage: e.target.value})} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
