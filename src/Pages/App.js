import '../Styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "../Pages/Navbar"
import Login from "./Login";
import React, {useEffect, useState} from "react";
import Logout from "./Logout";
import Cookies from 'js-cookie';
import Register from "./Register";
import ModifyPersonalInformation from "./ModifyPersonalInformation";
import { IntlProvider } from "react-intl";
import textEN from '../Languages/en.json'
import textPL from '../Languages/pl.json'

const text = {
    en: textEN,
    pl: textPL
}

function App() {
    const [role, setRole] = useState(Cookies.get('role'));
    const [locale, setLocale] = useState("en");


    useEffect( () => {
        const cookiesCheck = () => {
            if (Cookies.get('role') !== undefined)
                setRole(Cookies.get('role'));
            setLocale(Cookies.get('locale'));
        }
        const verifyJWT = async () => {
            if (Cookies.get('jwt') !== undefined) {
                const response =  await fetch(`http://127.0.0.1:3100/users/verify`, {
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

        //=======

        if(Cookies.get("locale") === undefined) {
            Cookies.set("locale", "en", {expires: 365 * 10});
        }

        verifyJWT();

        const interval1 = setInterval(cookiesCheck, 1000);
        const interval2 = setInterval(verifyJWT, 600000);
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        }
    }, []);

  return (
    <BrowserRouter>
        <IntlProvider locale={locale} messages={text[locale]}>
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
