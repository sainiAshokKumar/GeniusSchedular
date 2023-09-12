import React from 'react'
import song from '../../public/song'
import {useState} from 'react'
import { useEffect } from 'react';
import List from './List'
import Player from './Player'
import Ex from '../components/Ex'
import Algorithms from './Algorithms';

function Body() {

  const [playList,setPlayList]=useState([]);
  const [audio,setAudio]=useState();
  const [sample,setSample]=useState();
  const [start,setStart]=useState(true);
  const [index,setIndex]=useState();
  const [algo,setAlgo]=useState();
  const [round,setRound]=useState(false)
  const [change,setChange]=useState(false)
  const [minRem,setMinRem]=useState(99999);


  const shortestJobFirst=()=>{
    if(algo!=='sjf')
    setAlgo('sjf')
    if(playList.length===0)
    return;
    setPlayList((playList)=>{
      let arr=playList.filter((song,index)=>{
        if(index!==0)
        return song;
      })
      return [playList[0],...arr.sort((a,b)=>{
        return Number(a.duration)-Number(b.duration);
      })]
    });
  }

  


  const fcfs=()=>{
    setPlayList((playList)=>{
      return [...playList.sort((a,b)=>{
        return Number(a.date)-Number(b.date)
      })]
    })
  }


  const roundRobin=()=>{
    if(algo!=='rr')
    {
      fcfs()
      setAlgo('rr')
    }
    setRound(true)
  }


  const handleSubmit=(i)=>{
    setIndex(i);
    setSample(new Audio(song[i].filePath));
  }
  const playSong=()=>{
    setAudio(new Audio(playList[0].filePath))
  }


  const shortestRemTime=()=>{
    if(algo!=='srtf')
    setAlgo('srtf')
    if(playList.length===0)
    return;
    if(playList[0].duration-(audio?audio.currentTime:0)>minRem)
    {
      audio.pause()
      let obj=playList[0];
      obj.currentTime=audio.currentTime
      obj.remTime=obj.duration-obj.currentTime
      setPlayList((list)=>{
        return list.filter((song,index)=>{
          if(index===0)
          return obj;
          return song;
        })
      })
      console.log('hello',playList);
      setPlayList((list)=>{
        setAudio()
        return [...list.sort((a,b)=>{
          return Number(a.remTime)-Number(b.remTime)
        })]
      })
    }
  }




 
  useEffect(()=>{
    console.log(playList);
    if(playList.length>0&&start===true)
    {
      if(!audio)
      playSong();
    }
  },[playList])




  useEffect(()=>{
    if(audio)
    {
      console.log(playList);
      audio.currentTime=playList[0].currentTime
      audio.play()
      if(round===true)
      {
        audio.addEventListener('timeupdate',()=>{
          if(audio.currentTime>=10+playList[0].currentTime)
          {
            audio.pause()
            playList[0].currentTime=audio.currentTime;
            let s=playList[0];
            setAudio();
            setPlayList((list)=>{
              return [...list.filter((song,index)=>{
                if(index!==0)
                return song;
              }),s];
            })
          }
        })
      }
      audio.addEventListener('ended',()=>{
        setAudio();
        setMinRem(99999);
        setPlayList((list)=>{
          return [...list.filter((song,i)=>{
            if(i!==0)
            return song;
          })]
        })
        if(algo==='srtf')
        setChange(true)
      })
      return ()=>{
        if(round===true)
        audio.removeEventListener('timeUpdate',()=>{});
        audio.removeEventListener('ended',()=>{});
      }
    }
  },[audio])

  useEffect(()=>{
    if(sample)
    {
      let duration;
      sample.addEventListener('loadedmetadata',async()=>{
        duration=sample.duration
        let currentTime=0
        let remTime=duration-currentTime
        let date=new Date().getTime().toString();
        setPlayList((list)=>{
          return [...list,{...song[index],duration,currentTime,date,remTime}]
        })
        setChange(true)
        setSample();
      })
      return ()=>{
        if(sample)
        sample.removeEventListener('loadedmetadata',()=>{})
      }
    }
  },[sample])


  useEffect(()=>{
    if(change)
    {
      if(algo==='sjf')
      shortestJobFirst()
      else 
      if(algo==='fcfs')
      fcfs()
      else 
      if(algo==='rr')
      roundRobin()
      if(algo==='srtf')
      {
        setMinRem(()=>{
          let rem=999999;
          rem=Math.min(rem,...playList.map((list,index)=>{
            if(audio&&index===0)
            return list.duration-audio.currentTime
            else
            return list.remTime;
          }))
          return rem===0?99999:rem;
        })
      }
      setChange(false)
    }
  },[change])


  
  useEffect(()=>{
    console.log('min Rem=>',minRem);
    console.log(playList);
    if(algo==='srtf')
    shortestRemTime()
  },[minRem])

  useEffect(()=>{
    setAlgo('fcfs')
  },[])

  return (
    <div className='flex flex-row' >
        <List song={song} handleSubmit={handleSubmit}/>
        {playList.length>0 && <Player playList={playList}/>}
        {/* <Ex/> */}
        <div>
        <Algorithms shortestJobFirst={shortestJobFirst} fcfs={fcfs} roundRobin={roundRobin} shortestRemTime={shortestRemTime} />
        </div>
    </div>
  )
}

export default Body