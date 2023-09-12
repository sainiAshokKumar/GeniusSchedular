import React from 'react'
import song from '../../public/song'

function Player({playList}) {
  return (
    <div className='text-black border-solid border-8 border-sky-400 w-auto'>
    {
      playList.map((gaana,index)=>{
        {
          return (
            <div key={index} className='flex flex-row cursor-pointer bg-orange-400 active-effect justify-start xs:ml-9 ml-3 m-3 w-[30vw]   items-center'>
              <img className='object-contain xs:h-[7vw] xs:w-[7vw] h-[4vw] w-[4vw] ' src={gaana.coverPath} />
              <div className='flex flex-row bg-blue-400 justify-center items-center w-[600px]'>
                <h2 className='md:text-2xl sm:text-base xs:text-[10px] text-[4px]  '>{gaana.songName}</h2>
              </div>
            </div>
          );
        }
      })
    }
    </div>
  )
}

export default Player