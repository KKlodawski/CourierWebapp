import {FormattedMessage} from "react-intl";
import {useState} from "react";

function PasswordEdit() {
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            <legend className="fs-2 fw-bold mb-4 text-lg-center "><FormattedMessage id="changePassword"/></legend>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                    <input className="form-control" type="text" value={password} id="password" name="password"
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <label htmlFor="password"><FormattedMessage id="password"/></label>
                </div>
                <div className="form-floating mb-2">
                    <div> {responseMessage !== undefined && <FormattedMessage id={responseMessage}/>} </div>
                </div>
                <div className="form-floating mb-2">
                    <button className="btn bg-white text-black" type="submit"><FormattedMessage id="confirm"/></button>
                </div>
            </form>
        </>
    )
}

export default PasswordEdit