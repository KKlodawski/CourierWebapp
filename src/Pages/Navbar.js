import "../Styles/global.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import { FormattedMessage } from "react-intl";
import flagPL from "../Icons/poland.png";
import flagUSA from "../Icons/united-states.png";


function Navbar() {
    const [locale, setLocale] = useState("en");
    const authorization = Cookies.get();

    const handleLanguageChange = (newLocale) => {
        Cookies.set("locale", newLocale, {expires: 365 * 10});
        setLocale(newLocale);
    }

    useEffect(() => {
        const cookieLocale = Cookies.get("locale")
        if(cookieLocale !== undefined)
            setLocale(cookieLocale);
    }, []);

    return (
        <>
            <nav className="navbar border-bottom primary-color">
                <div className="btn-group align-items-center ms-5" role="group">
                    <Link to="/" className="btn primary-hover primary-active text-white border-0"> Test Main</Link>
                    <Link to="/Login" className="btn primary-hover primary-active text-white border-0"> Test Login</Link>
                    <Link to="/Register" className="btn primary-hover primary-active text-white border-0"> Test Reg</Link>
                    <Link to="/PersonalInformation" className="btn primary-hover primary-active text-white border-0 "> Test PI</Link>
                </div>
                <div className="d-flex">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 align-content-center h-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {locale === "en" && <img className="flag" src={flagUSA}/>}
                            {locale === "pl" && <img className="flag" src={flagPL}/>}
                        </button>
                        <ul className="primary-color bg dropdown-menu">
                            <li><div className="dropdown-item primary-hover text-white" onMouseUp={() => {handleLanguageChange("en");}}><img className="flag" src={flagUSA}/> <FormattedMessage id="langENG"/></div></li>
                            <li><div className="dropdown-item primary-hover text-white" onMouseUp={() => {handleLanguageChange("pl");}}><img className="flag" src={flagPL}/> <FormattedMessage id="langPL"/></div></li>
                        </ul>
                    </div>
                    <div className="dropdown me-5">
                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 align-content-center h-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {authorization.username === undefined ? <FormattedMessage id="loginMessage"/>  : authorization.username}
                        </button>
                        <ul className="dropdown-menu primary-color">
                            {authorization.role === undefined && <Link to="/Login" className="dropdown-item primary-hover text-white"> <FormattedMessage id="loginButton"/> </Link>}
                            {authorization.role === undefined && <Link to="/Register" className="dropdown-item primary-hover text-white"> <FormattedMessage id="registerButton"/> </Link>}
                            {authorization.role !== undefined && <Link to="/PersonalInformation" className="dropdown-item primary-hover text-white"> <FormattedMessage id="personalInformation"/> </Link>}
                            {authorization.role !== undefined && <Link to="/Logout" className="dropdown-item primary-hover text-white"> <FormattedMessage id="logoutButton"/> </Link>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;