import React from "react";
import { NavLink } from "react-router-dom";
import { UseSelector,useDispatch,useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar(){

  const isLoggedIn = useSelector (state => state.authSlice.isLoggedIn)
  const dispatch = useDispatch();
  const navigate = useNavigate();


    return(<>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">OLS</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">

    <li className="nav-item">
        <NavLink to='/instructorRegister' className="nav-link" href="#">Instructor Register</NavLink>
      </li><li className="nav-item">
        <NavLink to='/instructorLogin/' className="nav-link" href="#"> Instructor Login</NavLink>
      </li>
   {
    isLoggedIn ? (<>
    
      <li className="nav-item">
        <NavLink to='/' className="nav-link" href="#">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/view' className="nav-link" href="#">view</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/add' className="nav-link" href="#">Add Course</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/lecture' className="nav-link" href="#">Add Lecture</NavLink>
      </li>
      <button className="btn btn-danger" onClick={function(){
        dispatch(logout())
        navigate('/login')
      }}>Logout</button>
    </>) 
    : (<>

      <li className="nav-item">
        <NavLink to='/register' className="nav-link" href="#">Register</NavLink>
      </li><li className="nav-item">
        <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
      </li>
    </>)

    
   } 

    </ul>
  </div>
</nav>
    
    </>)
}

export default React.memo(Navbar);