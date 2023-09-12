import {FiSearch} from 'react-icons/fi'
function NavBar() {
    return <div className="navbar bg-primary text-primary-content absolute top-0 left-0 z-10 px-4">
    <img src="logos/logo_white.png" alt="logo" className="w-20"/>
    <div className="flex-grow"></div>
    <div className="join rounded-full">
  <div>
    <div>
      <input className="input join-item input-sm" placeholder="Search"/>
    </div>
  </div>

 
    <button className="btn btn-sm join-item ">
        <FiSearch className="text-xl"/>
    </button>

</div>
  </div>
}

export default NavBar;