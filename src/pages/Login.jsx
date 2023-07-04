import { Box,Button,TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import authApi from '../api/authApi'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);  // Status for loading animation on a button

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    //Get the string in the form
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    // Validation checking
    let error = false;

    if(username === ""){
      error = true;
      setUsernameErrText("Enter your name.")
    }
    if(password === ""){
      error = true;
      setPasswordErrText("Enter your password.")
    }
    if(error) return;

    //Start loading 
    setLoading(true);

    //Calling Sign Up API
    try {
      const res =await authApi.login({
        username, // from server/src/v1/controllers/user.js
        password, // Same as the information entered in the "body" of Postman.
      });

      //End loading
      setLoading(false);
      
      localStorage.setItem("token", res.token); //"res.token" is from user.js in server folder
      console.log("Login Succeeded!");
      
      //Going to the top page
      navigate("/");

    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((e)=>{
        if(e.param === "username"){
          setUsernameErrText(e.msg)
        }
        if(e.param === "password"){
          setPasswordErrText(e.msg)
        }
      });

      //End loading
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField 
          fullWidth 
          id="username" 
          label="user name" 
          margin='normal' 
          name='username'
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""} //usernameErrText is not empty = error
          disabled={loading} //Can't enter texts while loading is true 
        />
        <TextField 
          fullWidth 
          id="password" 
          label="password" 
          margin='normal' 
          name='password'
          type='password' //PW text becomes blind
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading} //Can't enter texts while loading is true 
        />
        <LoadingButton
          sx={{mt: 3, mb: 2}}
          fullWidth type='submit'
          loading={loading}
          color='primary'
          variant='outlined'
        >
          log in
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        sign up
      </Button>
    </>
  )
}

export default Login