import '../Styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "../Pages/Navbar"
import Login from "./Login";
import React, {useEffect, useRef, useState} from "react";
import Logout from "./Logout";
import Cookies from 'js-cookie';
import Register from "./Register";
import ModifyPersonalInformation from "./ModifyPersonalInformation";
import { IntlProvider } from "react-intl";
import textEN from '../Languages/en.json'
import textPL from '../Languages/pl.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import PersonalModal from "../Components/Modal";

const text = {
    en: textEN,
    pl: textPL
}

function App() {
    const [role, setRole] = useState(Cookies.get('role'));
    const [locale, setLocale] = useState("en");
    const buttonRef = useRef(null);


    useEffect( () => {
        localStorage.setItem("apiDown", false);
        const cookiesCheck = () => {
            if (Cookies.get('role') !== undefined)
                setRole(Cookies.get('role'));
            setLocale(Cookies.get('locale'));
        }
        const verifyJWT = async () => {
            if (Cookies.get('jwt') !== undefined) {
                const response = await fetch(`http://127.0.0.1:3100/users/verify`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${Cookies.get('jwt')}`
                    }
                });
                if(!response.ok) {
                    Cookies.remove('jwt');
                    Cookies.remove('role');
                    Cookies.remove('username');
                    window.location.reload();
                }
            }
        }

        const checkModalTrigger = () => {
            if(localStorage.getItem("apiDown") === "true") {
                localStorage.setItem("apiDown", "false");
                buttonRef.current.click();
            }
        }

        //=======

        if(Cookies.get("locale") === undefined) {
            Cookies.set("locale", "en", {expires: 365 * 10});
        }

        verifyJWT();

        const interval1 = setInterval(cookiesCheck, 1000);
        const interval2 = setInterval(verifyJWT, 60000);
        const interval3 = setInterval(checkModalTrigger, 1000);
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
        }
    }, []);

  return (
    <BrowserRouter>
        <IntlProvider locale={locale} messages={text[locale]}>
            <button ref={buttonRef} type="button" data-bs-toggle="modal" data-bs-target="#responseError" hidden/>
            <PersonalModal id="responseError" text="apiDownMessage" confirmRole="button"/>
            <Navbar/>
            <Routes>
                {role === undefined && <Route path="/Login" element={<Login/>}/>}
                {role === undefined && <Route path="/Register" element={<Register/>}/>}
                {role !== undefined && <Route path="/Logout" element={<Logout/>}/>}
                {role !== undefined && <Route path="/PersonalInformation" element={<ModifyPersonalInformation/>}/>}
            </Routes>
        </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
