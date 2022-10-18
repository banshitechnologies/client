import authContext from "./AuthContext";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthState = (props) => {
    const navigate = useNavigate();
    const [token,setToken] = useState();

    useEffect(() => {
        setToken(Cookies.get('user'));
    }, [token])
    const register = (e, data) => {
        e.preventDefault();
        console.log(data);
        axios.post('auth/register', {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            pass: data.pass
        })
            .then(function (response) {
               console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const login = (e, data) => {
        e.preventDefault();
        axios.post('auth/login', {
            username: data.userName,
            password: data.password
        }).then((res) => {
            console.log(res.status);
            const accesstoken = Cookies.get('user');
            setToken(accesstoken);
        }).catch((err) => {
            console.log(err);
        })
        navigate("/")
    }
    const state = {
        register,
        login,
        token
    }

    return (
        <authContext.Provider value={state}>
            {props.children}
        </authContext.Provider>
    )

}

export default AuthState;

