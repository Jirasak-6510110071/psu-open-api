import { FaBars } from "react-icons/fa"
import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const {sidebarToggle, setSidebarToggle} = useAuth()
  return (
   <nav className='px-4 py-4 flex justify-between shadow-md'>
    <div className='flex items-center text-xl'>
      <FaBars className='text-zinc-800 me-4 cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)}/>
      <span className='text-zinc-800 font-semibold'>PSU-Together</span>
    </div>
    <div></div> 
   </nav>
  )
}

export default Navbar