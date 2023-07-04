import React, { useEffect, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../redux/features/memoSlice';

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        console.log(res.title);
        setTitle(res.title);
        setDescription(res.description);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  let timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {title: newTitle});
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {description: newDescription});
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);
      const newMemos = memos.filter((e) => e._id !== memoId); //選択したメモを取り除いたmemosが入る。
      if(newMemos.length === 0){ //Redirect to the top page or top memo after deleting a memo.
        navigate("/memo");
      }else{
        navigate(`/memo/${newMemos[0]._id}`);
      }

      dispatch(setMemo(newMemos)); //リアルタイムでSidebarのmemosを減らす。
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box 
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color='error' onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{padding: "10px 50px"}}>
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder='Memo title' 
          variant='outlined' 
          fullWidth 
          sx={{
            ".MuiOutlinedInput-input": {padding: 0},
            ".MuiOutlinedInput-notchedOutline": {border: "none"},
            ".MuiOutlinedInput-root": {fontSize: "2rem", fontWeight: 700},
          }}
        />
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder='Add the content' 
          variant='outlined' 
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": {padding: 0},
            ".MuiOutlinedInput-notchedOutline": {border: "none"},
            ".MuiOutlinedInput-root": {fontSize: "1.2rem"},
          }} 
        />
      </Box>
    </>
  );
};

export default Memo