import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  setSelectedchatIdex } from './Store/slices/ChatSlice';

// let data=[
//   {"username": "AaravAmbani", "socketId": "3b6a9c"},
//   {"username": "AaradhyaBose", "socketId": "8e1f5g"},
//   {"username": "AadiChopra", "socketId": "2h4j6k"},
//   {"username": "AadhiraDutta", "socketId": "9l5m7n"},
//   {"username": "AaravDesai", "socketId": "0p3q8r"},
//   {"username": "AaliaEswaran", "socketId": "7s4t2u"},
//   {"username": "AakashFernandes", "socketId": "6v3w1x"},
//   {"username": "AanyaGupta", "socketId": "2y9z0a"},
//   {"username": "AaravHegde", "socketId": "5b7c4d"},
//   {"username": "AaradhyaIyer", "socketId": "8e2f6g"},
//   {"username": "AadilJoshi", "socketId": "1h3j5k"},
//   {"username": "AadhyaKumar", "socketId": "9l6m4n"},
//   {"username": "AadiLal", "socketId": "0p8q2r"},
//   {"username": "AahanaMalhotra", "socketId": "7s9t3u"},
//   {"username": "AakashNair", "socketId": "6v4w1x"},
//   {"username": "AaliaOjha", "socketId": "3y5z7a"},
//   {"username": "AanyaPatel", "socketId": "6b8c0d"},
//   {"username": "AaravRajput", "socketId": "9e1f3g"},
//   {"username": "AaradhyaSharma", "socketId": "2h4j7k"},
//   {"username": "AadityaSingh", "socketId": "8l6m9n"},
//   {"username": "AadrikaTiwari", "socketId": "0p3q7r"},
//   {"username": "AahilVerma", "socketId": "5s4t2u"},
//   {"username": "AaradhyaYadav", "socketId": "6v9w1x"},
//   {"username": "AadhavZaveri", "socketId": "3y2z8a"},
//   {"username": "AahanaAgarwal", "socketId": "6b4c9d"},
//   {"username": "AaravBakshi", "socketId": "1e3f7g"},
//   {"username": "AaradhyaChatterjee", "socketId": "9h5j2k"},
//   {"username": "AaditDewan", "socketId": "0l6m8n"},
//   {"username": "AadhiraGanguly", "socketId": "7p9q1r"},
//   {"username": "AadyaHariharan", "socketId": "2s4t6u"},
//   {"username": "AadyaIyengar", "socketId": "5v3w7x"},
//   {"username": "AadiJoshi", "socketId": "8y1z0a"},
//   {"username": "AadyaKannan", "socketId": "3b6c9fd"},
//   {"username": "AadityaLal", "socketId": "6e8f2g"},
//   {"username": "AahanaMehta", "socketId": "9h1j4k"},
//   {"username": "AadhavNarayanan", "socketId": "0l3m7n"},
//   {"username": "AaditOberoi", "socketId": "7p4q9r"},
//   {"username": "AadrikaPandey", "socketId": "2s6t8u"},
//   {"username": "AaditRajagopal", "socketId": "5v9w3x"},
//   {"username": "AadyaShah", "socketId": "8y2z1a"},
//   {"username": "AadyaThakkar", "socketId": "3b5c7d"},
//   {"username": "AadiVerma", "socketId": "6e9f1g"},
//   {"username": "AadityaYadav", "socketId": "9h2gj4k"},
//   {"username": "AahanaZaveri", "socketId": "0lb5m8n"},
//   {"username": "AaditAgarwal", "socketId": "7p3gvq6r"},
//   {"username": "AadrikaBajaj", "socketId": "2s9dfft1u"},
//   {"username": "AadyaChauhan", "socketId": "5v7w4x"},
//   {"username": "AaditDeshpande", "socketId": "adya"},
//   {"username": "AadrikaGupta", "socketId": "3b6c8d"},
//   {"username": "AadyaIyer", "socketId": "6e9f5g"},
//   {"username": "AahanaJain", "socketId": "9h2j6k"},
//   {"username": "AaditKapoor", "socketId": "0l5m7n"},
//   {"username": "AadrikaKhanna", "socketId": "7p3q8r"},
//   {"username": "AadyaLal", "socketId": "2s9t2du"},
//   {"username": "AaditMehta", "socketId": "5v7w3x"},
//   {"username": "AadrikaNair", "socketId": "8y0sz1a"},
//   {"username": "AadyaOjha", "socketId": "3b6gc9d"},
//   {"username": "AaditPatel", "socketId": "6e9f4g"},
//   {"username": "AadrikaPillai", "socketId": "9h2j5k"},
//   {"username": "AadyaRaj", "socketId": "0l5m8n"},
//   {"username": "AaditSaxena", "socketId": "7p3q6r"},
//   {"username": "AadrikaShah", "socketId": "2s9t1u"},
//   {"username": "AadyaSharma", "socketId": "5v7wss4x"},
//   {"username": "AaditSingh", "socketId": "8y0z2a"},
//   {"username": "AadrikaTiwari", "socketId": "3b6ac8d"},
//   {"username": "AadyaVerma", "socketId": "6e9f7g"},
//   {"username": "AaditYadav", "socketId": "9h2j4rk"},
//   {"username": "AadrikaAhuja", "socketId": "0l5m9n"},
//   {"username": "AadyaBanerjee", "socketId": "7p3q1r"},
//   {"username": "AaditChatterjee", "socketId": "2s9t3u"},
//   {"username": "AadrikaDutta", "socketId": "5v7w5x"},
//   {"username": "AadyaGanguly", "socketId": "8y0z3a"},
//   {"username": "AaditIyer", "socketId": "3b6c7d"},
//   {"username": "AadrikaJha", "socketId": "6e9f1ggg"},
//   {"username": "AadyaKumar", "socketId": "9h2j4k"},
//   {"username": "AaditMalhotra", "socketId": "0l5m6n"},
//   {"username": "AadrikaNaidu", "socketId": "7p3q9r"},
//   {"username": "AadyaOberoi", "socketId": "2s9t2u"},
//   {"username": "AaditPatil", "socketId": "5vt7w3x"},
//   {"username": "AadrikaRaj", "socketId": "8y0z1a"},
//   {"username": "AadyaSharma", "socketId": "3b6c9d"}
// ]



const Navbar = () => {
  const dispatch=useDispatch();
  const [userData,setUserData] =useState([]);
  const {chats}=useSelector(state=>state.chatReducer)
    const {selectedChatindex}=useSelector(state=>state.chatReducer)
  useEffect(() =>{
    setUserData(chats);
  },[chats])

  const handleSearch=(e)=>{
    const search=e.target.value.trim().toLowerCase();
    setUserData(chats.filter(user=>user.username.toLowerCase().includes(search)));
  }


  
    
  

  return (
    <div className={`md:w-64   ${selectedChatindex!=null?"hidden md:block w-screen":"block w-full z-20"}`}>  
      <aside className="bg-gray-900 text-white w-full md:w-64 pt-4 pb-16 fixed top-0 left-0 bottom-0 ">
        <input type="text" className='ml-2 rounded-lg p-2 text-black' onChange={handleSearch} placeholder='Search....'/>
        <div className="container mx-auto h-full overflow-y-auto">
          <ul>
            {userData.length == 0 && <h1>No One Is Online Now !!! 😒😒</h1>}
            {userData.map((user,index) => (
              
              <li key={user.socketId} className="my-2 cursor-pointer" onClick={()=>dispatch(setSelectedchatIdex(index))}>
                <span className="px-3 py-1 hover:bg-gray-800 rounded">{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
  
  
}

export default Navbar
