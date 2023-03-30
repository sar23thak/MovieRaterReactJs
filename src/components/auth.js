import React, { useContext, useEffect, useState } from "react";
// import useCookies from "react-cookie/cjs/useCookies";
import API from "../api-service";
// import { TokenContext } from "../index";
import {useCookies} from "react-cookie"

function Auth(){



    const [ username,  setUsername ] = useState('');
    const [ password,  setPassword ] = useState('');
    const [islogin, setIsLogin] = useState(false);
    // const [text, setText] = useState("Sign Up")

    // const {token, setToken} = useContext(TokenContext);
    const [token, setToken] = useCookies(['mr-token']);

    useEffect(()=>{
        console.log(token);
        if(token['mr-token']) window.location.href = "/movies/ "
    }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
            // .then(resp => setToken(resp.token))
            .then(resp => setToken('mr-token', resp.token))
            .catch(error => console.log(error))
    }

    const registerClicked = () =>{
        API.registerUser({username, password})
        .then(resp => console.log(resp))
        .then(() => loginClicked())
        .catch(error=>console.log(error))
    }

    return(
        <div>
            {islogin ? <h2>Log In</h2>: <h2>Register</h2>}
            <label htmlFor="username">Username</label>
            <br />
            <input id="username" type= "text" placeholder="username" 
                    value={username} onChange={evt=>setUsername(evt.target.value)}
                />
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" placeholder="password"
                    value={password} onChange={evt => setPassword(evt.target.value)}
            />
            <br/>
            {/* <button id="login" onClick={loginClicked}>Log In</button> */}
            {islogin ? 
                <button id="login" onClick={loginClicked}>Log In</button> :
                <button id="login" onClick={registerClicked}>Sign Up</button>
            }
            {islogin ? 
                <p>New User? <span onClick={()=>setIsLogin(false)}>Register</span> </p> :
                <p>Already have an account? <span onClick={()=>setIsLogin(true)}>Log In</span> </p>
            }
            
        </div>
    )
}
export default Auth