import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setUserIdHandler }) => {
  const history = useHistory();
  const [userId, setUserId] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("event", userId);
    setUserIdHandler(userId);
    history.push("/chat");
  };

  const updateInputHandler = (e) => {
    console.log("e", e.target.value);
    if (e.target.value) setUserId(e.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={"100%"}
      marginTop={5}
    >
      <Box
        width={400}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          variant="outlined"
          placeholder="Enter the User Id"
          onChange={updateInputHandler}
        />
        <Button onClick={onSubmitHandler}>Login</Button>
      </Box>
    </Box>
  );
};

export default Login;
