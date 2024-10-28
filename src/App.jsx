import { useState } from 'react'
import { useSelector } from 'react-redux'


function App() {

  const state=useSelector((state)=>{
    return state.media.value;
  });

  console.log(state);
  return (
    <>
    
    </>
  )
}

export default App
