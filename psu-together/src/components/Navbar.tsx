import React from 'react'
import navLogo from '../assets/PSU-Together-Logo.svg'

function Navbar() {
  return (
    <div className="navbar bg-base-100 mb-2 sticky top-0" style={{ backgroundColor: '#AFD198' }} >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
        <div>
          <a>
            <img src={navLogo} className='btn btn-ghost'/>
          </a>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-xl font-bold ">PSU Together</a>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost rounded-full w-12">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Navbar