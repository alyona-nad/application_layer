import React, {useState} from 'react';
import "./LoginLayout.css";
import {Box, Button, Container, TextField} from "@mui/material";
import nano from "../../assets/nano.png";
import {useDispatch} from "react-redux";
import {setUsername} from "../../features/messages/messageSlice.js";

function LoginLayout() {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const login = (e) => {
        if(e.target[0].value && e.target[0].value.length <= 30) {
            dispatch(setUsername(e.target[0].value))
        } else {
            setError(true)
        }
        e.stopPropagation();
        e.preventDefault();
    }
    return (
        <Box sx={{
            bgcolor: "#F4F7F9",
            width: 1,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <form onSubmit={login}>
                <Container maxWidth="sm" sx={{
                    bgcolor: "#fff",
                    p: 6,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Box sx={{
                        display: "flex",
                        pb: 6,
                        gap: 2
                    }}>
                        <img className={"logo"} src={nano} alt={"nano"}/>
                        <p className={"logotext"}><span className={"nano"}>nano</span>Passport</p>
                    </Box>

                    <TextField error={error} label="Имя" variant="outlined" size="small" multiline={false} sx={{width: "419px", mb: 5}}/>
                    <Button
                        type={"submit"}
                        variant="contained"
                        color="primary"
                        size="medium">
                        Войти
                    </Button>
                </Container>
            </form>
        </Box>
    );
}

export default LoginLayout;
