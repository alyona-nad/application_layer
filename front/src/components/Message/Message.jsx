import React from 'react';
import {Box, Typography} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';

function Message({message, time, sender, own, error}) {
    const formatDate = (date) => {
        let d = new Date(Date.parse(date));
        return d.toLocaleTimeString();
    }
    return (
        <Box sx={{
            mt: 6,
            display: "flex",
            alignItems: "center",
            pr: 4
        }}>
            <Box sx={{width: "50px", height: "50px", ml: "-50px", flexShrink: "0"}}>
                <ErrorIcon color={"error"} fontSize={"large"} sx={{
                    display: error ? "block" : "none"
                }}></ErrorIcon>
            </Box>
            <Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}>
                    <Typography variant={"body1"} component={"div"} sx={{
                        fontWeight: "600",
                        fontSize: "22px",
                        fontFamily: "sans-serif"
                    }} color={own ? "secondary" : "primary"}>{sender}</Typography>
                    <Typography variant={"body1"} component={"div"} color={"#D3CECE"} sx={{
                        fontWeight: "600",
                        fontSize: "18px",
                        fontFamily: "Inter, sans-serif"
                    }}>{formatDate(time)}</Typography>
                </Box>
                <Typography variant={"body1"} component={"div"} sx={{
                    fontWeight: "400",
                    fontSize: "21px",
                    fontFamily: "Inter, sans-serif"
                }}>{message}</Typography>
                <Typography variant={"body1"} component={"div"} color={"#F60808"} sx={{
                    display: error ? "block" : "none",
                    fontWeight: "400",
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif"
                }}>{"При отправке сообщения возникла ошибка"}</Typography>
            </Box>
        </Box>
    );
}

Message.propTypes = {
    sender: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    own: PropTypes.bool.isRequired
}
export default Message;
