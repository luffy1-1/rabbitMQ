import React, { useEffect, useState } from 'react';
import { Typography, Button } from "@mui/material";
import { socket } from '../../socket';
const SocketComponent = () => {
    const [messages, setMessages] = useState([])
    const [start, setStart] = useState(false)
    useEffect(() => {
        // no-op if the socket is already connected
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);
    useEffect(() => {
        // Receive events from the server
        socket.on('chat message', (message) => {
            console.log("Chat m,e", message)
            setMessages((me) => {
                let test = [...me, message]
                return test
            });
        })
        // Clean up the Socket.io connection
        return () => {
            socket.off('chat message')
        };
    }, [messages])
    useEffect(() => {
        if (start) {
            socket.connect()
        }
        else {
            socket.disconnect();
        }
    }, [start])
    return (
        <>
            {messages.map(m =>
                <Typography key={m.timestamp}><span style={{ fontWeight: 700 }}>{m.timestamp}</span> {m.message} ({m.priority})</Typography>
            )}

            <br></br>
            <br></br>
            <Button variant="contained" onClick={() => setStart(!start)}>{start ? 'Pause' : 'Start'}</Button>
        </>
    );
}

export default SocketComponent;
