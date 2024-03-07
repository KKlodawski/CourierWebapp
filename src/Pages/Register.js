import "../Styles/Login.css";
import {MdErrorOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {FormattedMessage} from "react-intl";

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            Password: password,
            Name: name,
            Surname: surname,
            Email: email,
            Phone: phone
        }
        const response = await fetch(`http://127.0.0.1:3100/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        response.json().then(message => {
            if(message.error === undefined ) {
                setErrorMessage(undefined);
                navigate('/login');
            } else {
                setErrorMessage(message.error);
            }
        })
    }


    return(
        <>
            <div className="loginPage">
                <div className="loginBox registerScale">
                    <div className="loginHeader"><FormattedMessage id="registerButton"/></div>
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="login"><FormattedMessage id="login"/></label>
                            <input type="text" value={login} id="login" name="login" onChange={(e) => setLogin(e.target.value)} required/>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password"><FormattedMessage id="password"/></label>
                            <input type={isPasswordVisible ? "text" : "password"} value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="name"><FormattedMessage id="name"/></label>
                            <input type="text" value={name} id="name" name="name" onChange={(e) => setName(e.target.value)} required/>
                        </div><
                        div className="formGroup">
                            <label htmlFor="surname"><FormattedMessage id="surname"/></label>
                            <input type="text" value={surname} id="surname" name="surname" onChange={(e) => setSurname(e.target.value)} required/>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email"><FormattedMessage id="email"/></label>
                            <input type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="formGroup">
                            <label htmlFor="phone"><FormattedMessage id="phone"/></label>
                            <input type="tel" value={phone} id="phone" name="phone" placeholder="#########" pattern="[0-9]{9}" maxLength='9' onChange={(e) => setPhone(e.target.value)} required/>
                        </div>
                        <div className="formGroup">
                            <div className="showPasswordToggle" onClick={handlePasswordVisibility}><FormattedMessage id="showPassword"/></div>
                        </div>
                        <div className="formGroup">
                            <div> <IoMdInformationCircleOutline /> <FormattedMessage id="correctLoginNotification"/></div>
                            <div> <IoMdInformationCircleOutline /> <FormattedMessage id="correctPasswordNotification"/> </div>
                            <div> <IoMdInformationCircleOutline /> <FormattedMessage id="correctNameNotification"/></div>
                            <div> <IoMdInformationCircleOutline /> <FormattedMessage id="correctSurnameNotification"/></div>
                            <div> <IoMdInformationCircleOutline /> <FormattedMessage id="correctPhoneNotification"/></div>
                        </div>
                        <div className="formGroup">
                            <div className={`errorMessage${errorMessage === undefined ? '' : ' visible'}`}>
                                <MdErrorOutline />{`\t`}
                                {errorMessage && <FormattedMessage id={errorMessage}/>}
                            </div>
                        </div>
                        <div className="formGroup">
                            <button type="submit"><FormattedMessage id="registerButton"/></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;