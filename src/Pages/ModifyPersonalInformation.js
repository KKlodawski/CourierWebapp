import "../Styles/Login.css"
import {FormattedMessage} from "react-intl";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function ModifyPersonalInformation() {
    const [personalInformation, setPersonalInformation] = useState({
        id: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        employmentDate: "",
        courierStatus: ""
    });
    const [loading, setLoading] = useState(true);
    const [responseMessage, setResponseMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = Cookies.get('role');
        if(role === "Client") {
            const data = {
                id: personalInformation.id,
                role: role,
                name: personalInformation.name,
                surname: personalInformation.surname,
                email: personalInformation.email,
                phone: personalInformation.phone
            }
            const response = await fetch(`http://127.0.0.1:3100/users/modify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${Cookies.get('jwt')}`
                },
                body: JSON.stringify(data)
            })
            response.json().then(msg => {
                setResponseMessage(msg.message);
            })
        }
        if(role === "Courier" || role === "Menager") {
            const data = {
                id: personalInformation.id,
                role: role,
                name: personalInformation.name,
                surname: personalInformation.surname
            }
            const response = await fetch(`http://127.0.0.1:3100/users/modify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${Cookies.get('jwt')}`
                },
                body: JSON.stringify(data)
            })
            if(response.ok)
                response.json().then(msg => {
                    setResponseMessage(msg.message);
                })
            else {
                setResponseMessage("modificationUnsuccessful");
            }
        }

    }

    const handleDataChange = (index,data) => {
        setPersonalInformation(  {
            ...personalInformation,
            [index]: data
        })
    }


    useEffect( () => {
        const getData = async () => {
            const response = await fetch(`http://127.0.0.1:3100/users/${Cookies.get("username")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${Cookies.get('jwt')}`
                }
            });
            response.json().then(data => {
                const role = Cookies.get("role");
                if(role === "Client") {
                    setPersonalInformation({
                        id: data.id,
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        phone: data.phone
                    })
                }
                else if(role === "Courier") {
                    setPersonalInformation({
                        id: data.id,
                        name: data.name,
                        surname: data.surname,
                        employmentDate: data.employmentDate,
                        courierStatus: data.courierStatus
                    })
                }
                else if(role === "Menager") {
                    setPersonalInformation({
                        id: data.id,
                        name: data.name,
                        surname: data.surname,
                        employmentDate: data.employmentDate
                    })
                }
                setLoading(false);
            })
        }

        getData();

    }, []);

    if(loading) {
        return (
            <>
                <div className="loginPage">
                    <div className="loginBox">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="loginPage">
                    <div className="loginBox">

                        <div className="loginHeader"><FormattedMessage id="personalInformation"/></div>
                        <form className="loginForm" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="name"><FormattedMessage id="name"/></label>
                                <input type="text" value={personalInformation.name} id="name" name="name"
                                       onChange={(e) => handleDataChange("name", e.target.value)} required/>
                            </div>
                            <
                                div className="formGroup">
                                <label htmlFor="surname"><FormattedMessage id="surname"/></label>
                                <input type="text" value={personalInformation.surname} id="surname" name="surname"
                                       onChange={(e) => handleDataChange("surname", e.target.value)} required/>
                            </div>
                            {personalInformation.email !== undefined && <div className="formGroup">
                                <label htmlFor="email"><FormattedMessage id="email"/></label>
                                <input type="email" value={personalInformation.email} id="email" name="email"
                                       onChange={(e) => handleDataChange("email", e.target.value)} required/>
                            </div>}
                            {personalInformation.phone !== undefined && <div className="formGroup">
                                <label htmlFor="phone"><FormattedMessage id="phone"/></label>
                                <input type="tel" value={personalInformation.phone} id="phone" name="phone"
                                       placeholder="#########" pattern="[0-9]{9}" maxLength='9'
                                       onChange={(e) => handleDataChange("phone", e.target.value)} required/>
                            </div>}
                            {personalInformation.employmentDate !== undefined && <div className="formGroup">
                                <label htmlFor="employmentDate"><FormattedMessage id="employmentDate"/></label>
                                <input type="date" value={personalInformation.employmentDate} id="employmentDate"
                                       name="employmentDate"
                                       onChange={(e) => handleDataChange("employmentDate", e.target.value)} readOnly/>
                            </div>}
                            {personalInformation.courierStatus !== undefined && <div className="formGroup">
                                <label htmlFor="courierStatus"><FormattedMessage id="courierStatus"/></label>
                                <input type="tel" value={personalInformation.courierStatus} id="courierStatus"
                                       name="courierStatus"
                                       onChange={(e) => handleDataChange("courierStatus", e.target.value)} readOnly/>
                            </div>}
                            <div className="formGroup">
                                <div> {responseMessage !== undefined && <FormattedMessage id={responseMessage}/>} </div>
                            </div>
                            <div className="formGroup">
                                <button type="submit"><FormattedMessage id="confirm"/></button>
                                <button type="submit"><FormattedMessage id="changePassword"/></button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default ModifyPersonalInformation;