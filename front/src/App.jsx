import {useEffect, useState} from 'react'
import './App.css'
import LoginLayout from "./layouts/LoginLayout/LoginLayout.jsx";

import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material";
import ChatLayout from "./layouts/ChatLayout/ChatLayout.jsx";
import {useDispatch, useSelector} from "react-redux";
import {add, error} from "./features/messages/messageSlice.js";
import {io} from "socket.io-client";

const theme = createTheme({
    palette: {
        primary: {
            light: '#000',
            main: '#000',
            dark: '#000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#0083A1',
            main: '#0083A1',
            dark: '#0083A1',
            contrastText: '#FFF',
        },
    },
});


function App() {
    const dispatch = useDispatch()
    const [socket, setSocket] = useState(null)
    const username = useSelector((state) => state.message.username)
    useEffect(() => {
        const newSocket = io("ws://localhost:8001", {
            reconnectionDelayMax: 10000,
        })

        newSocket.on("connect", () => {
            newSocket.on("message", (d) => {
                dispatch(add(d))
                console.log(d);
            })
            newSocket.on("error", (d) => {
                dispatch(error(d))
                console.log(d);
            })
            console.log("connected");
        });

        setSocket(newSocket)

        return () => newSocket.disconnect()
    }, [])

    const sendMessage = (message) => {
        if (socket) {
            socket.send({sender: username, message})
        }
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                {username ?
                    <ChatLayout sendMessage={sendMessage}/>
                    :
                    <LoginLayout/>
                }
            </ThemeProvider>
        </>
    )
}

export default App
