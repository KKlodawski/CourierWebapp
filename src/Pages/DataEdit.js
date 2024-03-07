import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {FormattedMessage} from "react-intl";

function DataEdit() {
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
    const handleDataChange = (index,data) => {
        setPersonalInformation(  {
            ...personalInformation,
            [index]: data
        })
    }
    return (
        <>
            <legend className="fs-2 fw-bold mb-4 text-lg-center "><FormattedMessage id="personalInformation"/></legend>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                    <input className="form-control" type="text" value={personalInformation.name} id="name" name="name"
                           onChange={(e) => handleDataChange("name", e.target.value)} required/>
                    <label htmlFor="name"><FormattedMessage id="name"/></label>
                </div>
                <div className="form-floating mb-2">
                    <input className="form-control" type="text" value={personalInformation.surname} id="surname" name="surname"
                           onChange={(e) => handleDataChange("surname", e.target.value)} required/>
                    <label htmlFor="surname"><FormattedMessage id="surname"/></label>
                </div>
                {personalInformation.email !== undefined && <div className="form-floating mb-2">
                    <input className="form-control" type="email" value={personalInformation.email} id="email" name="email"
                           onChange={(e) => handleDataChange("email", e.target.value)} required/>
                    <label htmlFor="email"><FormattedMessage id="email"/></label>
                </div>}
                {personalInformation.phone !== undefined && <div className="form-floating mb-2">
                    <input className="form-control" type="tel" value={personalInformation.phone} id="phone" name="phone"
                           placeholder="#########" pattern="[0-9]{9}" maxLength='9'
                           onChange={(e) => handleDataChange("phone", e.target.value)} required/>
                    <label htmlFor="phone"><FormattedMessage id="phone"/></label>
                </div>}
                {personalInformation.employmentDate !== undefined && <div className="form-floating mb-2">
                    <input className="form-control" type="date" value={personalInformation.employmentDate} id="employmentDate"
                           name="employmentDate"
                           onChange={(e) => handleDataChange("employmentDate", e.target.value)} readOnly/>
                    <label htmlFor="employmentDate"><FormattedMessage id="employmentDate"/></label>
                </div>}
                {personalInformation.courierStatus !== undefined && <div className="form-floating mb-2">
                    <input className="form-control" type="tel" value={personalInformation.courierStatus} id="courierStatus"
                           name="courierStatus"
                           onChange={(e) => handleDataChange("courierStatus", e.target.value)} readOnly/>
                    <label htmlFor="courierStatus"><FormattedMessage id="courierStatus"/></label>
                </div>}
                <div className="form-floating mb-2">
                    <div> {responseMessage !== undefined && <FormattedMessage id={responseMessage}/>} </div>
                </div>
                <div className="form-floating mb-2">
                    <button type="button" className="btn bg-white text-black" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FormattedMessage id="confirm"/></button>
                </div>

                <div className="modal " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body text-black text-lg-center fw-bold mt-2 mb-4 fs-3">
                                <FormattedMessage id="confirmationMessage"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><FormattedMessage id="cancel"/></button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"><FormattedMessage id="confirm"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )

}

export default DataEdit