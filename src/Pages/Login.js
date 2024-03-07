import "../Styles/Login.css"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { FormattedMessage } from "react-intl";

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
    const handlePasswordVisibility = () => {
        if(isPasswordVisible) setPasswordVisibility(false);
        else setPasswordVisibility(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            Login: login,
            Password: password
        }
        const response = await fetch(`http://127.0.0.1:3100/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        response.json().then(message => {
            if(message.error === undefined ) {
                const decodedToken = jwtDecode(message.token);
                Cookies.set('jwt', message.token, {expires: 1, secure: true})
                Cookies.set('role', decodedToken.role, {expires: 1, secure: true});
                Cookies.set('username', decodedToken.login, {expires: 1, secure: true});
                setErrorMessage(undefined);
                navigate('/');
            } else {
                setErrorMessage(message.error);
            }
        })
    }

    return (
        <>
            <div className="loginPage">
                <div className="loginBox">
                    <div className="loginHeader"><FormattedMessage id="loginMessage"/></div>
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="login"><FormattedMessage id="login"/></label>
                            <input type="text" value={login} id="login" name="login" onChange={(e) => setLogin(e.target.value)} required/>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password"><FormattedMessage id="password"/></label>
                            <input type={isPasswordVisible ? "text" : "password"} value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                                <div className="showPasswordToggle" onClick={handlePasswordVisibility}><FormattedMessage id="showPassword"/></div>
                        </div>
                        <div className="formGroup">
                            <div className={`errorMessage${errorMessage === undefined ? '' : ' visible'}`}><MdErrorOutline />{`\t${errorMessage}`}</div>
                        </div>
                        <div className="formGroup">
                            <button type="submit"><FormattedMessage id="loginMessage"/></button>
                        </div>
                    </form>
                    <Link to="/Register" className="registerPrompt"><FormattedMessage id="createAccount"/></Link>
                </div>
            </div>
        </>
    )
}

export default Login;