import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from '../../utils/authUtils'

const AuthLayout = () => {

  //Checking if user has JWT token or not every when page changes.
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      //If user has JWT token, redirect to the top page.
      if(isAuth){
        navigate("/");
      }
    };
    checkAuth();
  },[navigate]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box 
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img 
            src={notionLogo}
            alt=""
            style={{width: 100, height: 100, marginBottom: 3}}
          />
          Notion clone
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default AuthLayout