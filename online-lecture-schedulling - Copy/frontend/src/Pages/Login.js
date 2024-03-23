import { useEffect, useState } from "react";
import React from "react";
import { loginAction } from "../Redux/authSlice";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Login (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(function(state){
        return state.authSlice.isLoggedIn
    });

    useEffect( function(){
        if(isLoggedIn){
            navigate('/')
        }
    } , [isLoggedIn])

const [formData , updateFormdata] = useState({
    email: '',
    password: ''
})

const handleChange = (e)=>{
    // console.log(formData)
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const loginUser = (e)=>{
    e.preventDefault();
    dispatch(loginAction(formData));
}

    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
   

  <div className="form-group">
    <label>Email address</label>
    <input value={formData.email} type="email" className="form-control"  placeholder="Enter email"  name="email" onChange={handleChange} />
  </div>


  <div className="form-group">
    <label>Password</label>
    <input value={formData.password} type="password" className="form-control" placeholder="Password"  name="password" onChange={handleChange} />
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}



export default React.memo(Login);