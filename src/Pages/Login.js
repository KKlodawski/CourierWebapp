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
            <div className="d-flex align-content-center text-white justify-content-center mt-2">
                <div className="primary-color p-4 rounded">
                    <legend className="fs-2 fw-bold mb-4 text-lg-center "><FormattedMessage id="loginMessage"/></legend>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input className="form-control" type="text" value={login} id="login" name="login" onChange={(e) => setLogin(e.target.value)} required/>
                            <label htmlFor="login"><FormattedMessage id="login"/></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" type={isPasswordVisible ? "text" : "password"} value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                            <label htmlFor="password"><FormattedMessage id="password"/></label>
                            <div className="mt-2 cursor-pointer" onClick={handlePasswordVisibility}><FormattedMessage id="showPassword"/></div>
                        </div>
                        <div className={`mb-3 ${errorMessage === undefined ? 'invisible' : ' visible'}`}>
                            <div className={`fst-italic d-block p-1 bg-danger danger-text-color rounded`}><MdErrorOutline />{`\t${errorMessage}`}</div>
                        </div>
                        <div className="mb-3">
                            <button className="btn bg-white text-black" type="submit"><FormattedMessage id="loginMessage"/></button>
                        </div>
                    </form>
                    <Link to="/Register" className="mt-2 cursor-pointer text-white text-decoration-none"><FormattedMessage id="createAccount"/></Link>
                </div>
            </div>
        </>
    )
}

export default Login;