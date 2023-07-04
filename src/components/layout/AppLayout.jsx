import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from '../../utils/authUtils'
import Sidebar from '../common/Sidebar'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/userSlice'

const AppLayout = () => {

  //Checking if user has JWT token every when page changes.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
  
      //If user has JWT token, redirect to the top page.
      if(!user){
        navigate("/login");
      }else{
        //If user has JWT token, keep the info with userSlice.
        //→ The user info becomes available from everywhere.
        dispatch(setUser(user));
      }
    };
    checkAuth();
  },[navigate]);

  return (
    <div>
        <Box sx={{display: "flex"}}>
            <Sidebar />
            <Box sx={{flexGrow: 1, p: 1, width: "max-content"}}>
                <Outlet />
            </Box>
        </Box>
    </div>
  );
};

export default AppLayout