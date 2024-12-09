import React, { useEffect, useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedchatIdex } from './Store/slices/ChatSlice';
import { IoArrowBackOutline } from 'react-icons/io5';

const Header = () => {
    const dispatch =useDispatch();


    
    const {selectedChatindex,chats} =useSelector(state=>state.chatReducer) ;

    const [selectedUserName,setSelectedUserName]=useState("");
    
    useEffect(()=>{
      // console.log("useEffect called");
      if(selectedChatindex!==null && chats.length > 0){
        setSelectedUserName(chats[selectedChatindex]?.username || "");
        // console.log("selectedUserName: ",selectedUserName);
      }
    },[selectedChatindex])
    
    // selectedUserName

  const humburgerhandler = () => {
   
    dispatch(setSelectedchatIdex(null))
  };

  return (
    <div className="flex justify-between flex-grow h-12 w-full items-center p-4 bg-gray-800 text-white sticky top-0">
      <div>
       
          <IoArrowBackOutline onClick={humburgerhandler} className="text-white  md:hidden" />
        
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold">{selectedUserName}</h1>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
