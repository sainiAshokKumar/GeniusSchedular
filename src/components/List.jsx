import React from 'react'

function List({song,handleSubmit}) {
  return (
    <div className='text-black border-solid border-8 border-sky-400 w-auto'>
        <h1 className='mt-2 border md:text-2xl xs:text-lg text-base  bg-white rounded-full '>Songs List</h1>
        {
            song.map((gaana,index)=>{
                return (
                <div key={index} className='flex flex-row cursor-pointer bg-orange-400 active-effect justify-start xs:ml-9 ml-3 m-3 w-[30vw]   items-center'>
                    <img className='object-contain xs:h-[5vw] xs:w-[5vw] h-[3vw] w-[3vw] ' onClick={()=>handleSubmit(index)} src={gaana.coverPath} />
                    <div className='flex flex-row bg-blue-400 justify-center items-center w-[600px]'>
                    <h2 className='md:text-lg sm:text-base xs:text-[10px] text-[4px]  '>{gaana.songName}</h2>
                    </div>
                </div>
                );
            })
        }
    </div>
  )
}

export default List