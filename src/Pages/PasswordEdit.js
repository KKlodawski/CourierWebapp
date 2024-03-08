import {FormattedMessage} from "react-intl";
import React, {useState} from "react";
import PersonalModal from "../Components/Modal";
import Cookies from "js-cookie";
import {IoMdInformationCircleOutline} from "react-icons/io";

function PasswordEdit() {
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState();
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const handlePasswordVisibility = () => {
        if(isPasswordVisible) setPasswordVisibility(false);
        else setPasswordVisibility(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                username: Cookies.get("username"),
                password: password
            }
            const response = await fetch(`http://127.0.0.1:3100/users/changePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${Cookies.get('jwt')}`
                },
                body: JSON.stringify(data)
            })
            response.json().then(message => {
                setResponseMessage(message.message);
            })
        } catch (error) {
            setResponseMessage("modificationUnsuccessful");
            localStorage.setItem("apiDown", "true")
        }

    }


    return (
        <>
            <legend className="fs-2 fw-bold mb-4 text-lg-center "><FormattedMessage id="changePassword"/></legend>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                    <input className="form-control" type={isPasswordVisible ? "text" : "password"} value={password} id="password" name="password"
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <label htmlFor="password"><FormattedMessage id="password"/></label>
                </div>
                <div className="mb-2">
                    <div className="mt-2 cursor-pointer" onClick={handlePasswordVisibility}><FormattedMessage id="showPassword"/></div>
                </div>
                <div className="form-floating mb-2">
                    {responseMessage !== undefined &&
                        <div className="fst-italic d-block p-1">
                            <IoMdInformationCircleOutline /> <FormattedMessage id={responseMessage}/>
                        </div>
                    }
                </div>
                <div className="form-floating mb-2">
                    <button type="button" className="btn bg-white text-black" data-bs-toggle="modal" data-bs-target="#modalPassword"><FormattedMessage id="confirm"/></button>
                </div>
                <PersonalModal id="modalPassword" text="confirmationMessage" confirmRole="submit"/>
            </form>
        </>
    )
}

export default PasswordEdit