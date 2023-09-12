import React from 'react'

function Algorithms({shortestJobFirst,fcfs,roundRobin,shortestRemTime}) {

  return (
    <div>
        <ul className='flex flex-col p-4'>
          <li className='m-5'>
            <button onClick={fcfs}>
              First Come First Serve
            </button>
          </li>
          <li className='m-5'>
            <button onClick={shortestJobFirst}>
              Shortest job First
            </button>
          </li>
          <li className='m-5'>
            <button onClick={roundRobin}>
              Round Robin 
            </button>
          </li>
          <li className='m-5'>
            <button onClick={shortestRemTime}>
              Shortest Remaining Time First
            </button>
          </li>
        </ul>
    </div>
  )
}

export default Algorithms