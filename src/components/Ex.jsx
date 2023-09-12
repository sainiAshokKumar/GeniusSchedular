import React, { useEffect } from 'react'
import { useState } from 'react';

function Ex() {
    const [numbers,setnumber]=useState([1,5,4,2,3]);
    const [hello,sethello]=useState(1);

    const fun=async()=>{
        console.log('In fun')
        // sethello(-1);
        setnumber((num)=>{
            return [...num.sort()];
        })
        console.log('agter sort',numbers)
    }

    useEffect(()=>{
        console.log("Hello In Example",numbers);
    },[numbers])


  return (
    <div className='text-black'>
        <h1  onClick={fun} className='text-black'>Hello</h1>
        {
            numbers.map((num,index)=>{
                return (<div key={index}>{num}</div>)
            })
        }
    </div>
  )
}

export default Ex