import React, {useState} from 'react';
import {AppBar, Box, Button, TextField, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/logo_big.png"
import SendIcon from "@mui/icons-material/Send"
import Message from "../../components/Message/Message.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clear, setUsername} from "../../features/messages/messageSlice.js";
import PropTypes from 'prop-types';

function ChatLayout({sendMessage}) {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.message.messages)
    const username = useSelector((state) => state.message.username)
    const [error, setError] = useState(false);
    const [value, setValue] = useState("");

    const send = (e) => {
        if (e.target[0].value) {
            setError(false);
            sendMessage(value);
            setValue("");
        } else {
            setError(true)
        }
        e.preventDefault();
        e.stopPropagation()
    }

    const logout = () => {
        dispatch(setUsername(""))
        dispatch(clear());
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh"
        }}>
            <AppBar
                position="static"
                sx={{
                    height: "140px",
                    px: 6
                }}
            >
                <Toolbar
                    sx={{
                        height: "140px",
                    }}
                >
                    <img
                        src={logo}
                        alt={"logo"}
                        className={"logo-big"}
                    />
                    <Box
                        sx={{flexGrow: 1}}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        {username}
                    </Typography>
                    <Button
                        onClick={logout}
                        variant="contained"
                        color="primary"
                        sx={{
                            border: "1px solid white",
                            ml: 6
                        }}
                        size="medium">
                        Выйти
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{
                flexGrow: 1,
                width: "75%",
                overflowY: "auto"
            }}>
                {messages?.map(m =>
                    <Message
                        key={m.sender + "_" + m.timestamp}
                        sender={m.sender}
                        time={m.timestamp}
                        message={m.message}
                        error={m.error}
                        own={m.sender === username}
                    />)}
            </Box>
            <Box sx={{
                pt: 6,
                width: "75%"
            }}>
                <form
                    onSubmit={send}
                    style={{width: "100%"}}
                >
                    <Box sx={{
                        height: "100px",
                        width: "100%",
                        position: "relative"
                    }}>
                        <TextField
                            error={error}
                            label="Написать сообщение..."
                            variant="outlined"
                            sx={{
                                width: '100%'
                            }}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Box sx={{
                            height: "56px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            top: 0,
                            right: 10,
                            position: "absolute"
                        }}>
                            <Button
                                type={"submit"}
                                variant="contained"
                                color="secondary"
                                size="large">
                                <SendIcon/>
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

ChatLayout.propTypes = {
    sendMessage: PropTypes.func.isRequired
}
export default ChatLayout;
