import React, { useContext, useEffect, useState } from 'react';
import Logo from '../data/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import authContext from '../contexts/AuthContext/AuthContext.js';
import Footer from './Footer';
function Login() {
    
    const context = useContext(authContext);
    const navigate = useNavigate();
    const refer = ()=>{
        navigate('/')
    }
    const [userLogin,setUserLogin] = useState({
        userName:'',
        password:''
    })
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({...userLogin,[name]:value});
    }
    
    useEffect(() => {
        console.log("rerender");
        if (context.token == undefined) {
            navigate('/login');
          }else{
            navigate('/');
          }
    },[context.token])
    
  return (
    <div>
       <div className="container">
                <div className="row flex justify-center">
                    <div className="col-md-7 center">
                        <div className="row ">
                            <div className="col-md-6 left_Side_main borderE">
                                <div className="logo pt-3 flex justify-center" >
                                    <img src={Logo} className="pt-3 pb-3" alt="" />
                                </div>

                                <div className="left_header">
                                    <h2>Wellcome !</h2>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos explicabo perspiciatis aspernatur placeat quasi !</p>
                                </div>
                            </div>
                            <div className="col-md-6 animate__animated animate__backInRight">
                                <div className="order-2 order-lg-1">
                                    <p className="text-center h4 fw-bold mb-3 mx-1 mx-md-4 clr mt-4">Login</p>
                                    <form  style={{maxWidth:"500px",margin:'auto'}} className='justify-center'>
                                        <div className="input-container">
                                            <i className="fa fa-user icon"></i>
                                            <input className="input-field regInput" type="text"placeholder="Username" onChange={handleChange} value={userLogin.userName} name="userName"/>
                                        </div>

                                        <div className="input-container">
                                            <i className="fa fa-key icon"></i>
                                            <input className="input-field regInput" type="password" placeholder="Password" onChange={handleChange} value={userLogin.password} name="password"/>
                                        </div>

                                        <div className="regbutton flex justify-center">
                                        <button type="submit" class="btn mt-4" onClick={(e)=>context.login(e,userLogin)}>Login</button>
                                        </div>
                                        <p style={{textAlign:'center',paddingLeft:'45px',marginTop:'20px'}}>Dont have an account ?  <Link to="/register">Register</Link></p>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Login
