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
            <div className="d-flex align-content-center text-white justify-content-center mt-2">
                <div className="primary-color p-4 rounded">
                    <legend className="fs-2 fw-bold mb-4 text-lg-center "><FormattedMessage id="registerButton"/></legend>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-2">
                            <input className="form-control" type="text" value={login} id="login" name="login" onChange={(e) => setLogin(e.target.value)} required/>
                            <label className="text-black" htmlFor="login"><FormattedMessage id="login"/></label>
                        </div>
                        <div className="form-floating mb-2">
                            <input className="form-control" type={isPasswordVisible ? "text" : "password"} value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                            <label className="text-black" htmlFor="password"><FormattedMessage id="password"/></label>
                        </div>
                        <div className="form-floating mb-2">
                            <input className="form-control" type="text" value={name} id="name" name="name" onChange={(e) => setName(e.target.value)} required/>
                            <label className="text-black" htmlFor="name"><FormattedMessage id="name"/></label>
                        </div><
                        div className="form-floating mb-2">
                            <input className="form-control" type="text" value={surname} id="surname" name="surname" onChange={(e) => setSurname(e.target.value)} required/>
                            <label className="text-black" htmlFor="surname"><FormattedMessage id="surname"/></label>
                    </div>
                        <div className="form-floating mb-2">
                            <input className="form-control" type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                            <label className="text-black" htmlFor="email"><FormattedMessage id="email"/></label>
                        </div>
                        <div className="form-floating mb-2">
                            <input className="form-control" type="text" value={phone} id="phone" name="phone" placeholder="#########" pattern="[0-9]{9}" maxLength='9' onChange={(e) => setPhone(e.target.value)} required/>
                            <label className="text-black" htmlFor="phone"><FormattedMessage id="phone"/></label>
                        </div>
                        <div className="mb-2">
                            <div className="mt-2 cursor-pointer" onClick={handlePasswordVisibility}><FormattedMessage id="showPassword"/></div>
                        </div>
                        <div className="mb-2">
                            <div className="fst-italic"> <IoMdInformationCircleOutline /> <FormattedMessage id="correctLoginNotification"/></div>
                            <div className="fst-italic"> <IoMdInformationCircleOutline /> <FormattedMessage id="correctPasswordNotification"/> </div>
                            <div className="fst-italic"> <IoMdInformationCircleOutline /> <FormattedMessage id="correctNameNotification"/></div>
                            <div className="fst-italic"> <IoMdInformationCircleOutline /> <FormattedMessage id="correctSurnameNotification"/></div>
                            <div className="fst-italic"> <IoMdInformationCircleOutline /> <FormattedMessage id="correctPhoneNotification"/></div>
                        </div>
                        <div className={`mb-2 ${errorMessage === undefined ? 'invisible' : ' visible'}`}>
                            <div className={`fst-italic d-block p-1 bg-danger danger-text-color rounded`}>
                                <MdErrorOutline />{`\t`}
                                {errorMessage && <FormattedMessage id={errorMessage}/>}
                            </div>
                        </div>
                        <div className="mb-2">
                            <button className="btn bg-white text-black" type="submit"><FormattedMessage id="registerButton"/></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;