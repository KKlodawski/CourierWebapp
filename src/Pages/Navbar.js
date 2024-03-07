import "../Styles/Navbar.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import { FormattedMessage } from "react-intl";
import flagPL from "../Icons/poland.png";
import flagUSA from "../Icons/united-states.png";


function Navbar() {
    const [isMenuActive, setMenuActive] = useState(false);
    const [isLangueageMenuActive, setLangueageMenuActive] = useState(false);
    const [locale, setLocale] = useState("en");

    const authorization = Cookies.get();
    const handleMenu = () => {
        if(isMenuActive) setMenuActive(false);
        else setMenuActive(true);
    }
    const handleLanguageMenu = () => {
        if(isLangueageMenuActive) setLangueageMenuActive(false);
        else setLangueageMenuActive(true);
    }

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
            <nav>
                <Link to="/" className="navButton"> Test Main</Link>
                <Link to="/Login" className="navButton"> Test Login</Link>
                <Link to="/Register" className="navButton"> Test Reg</Link>
                <Link to="/PersonalInformation" className="navButton"> Test PI</Link>
                <div className="rightCenter">
                    <div className="navButton centerFlag" onMouseDown={handleLanguageMenu}>
                        {locale === "en" && <img className="flag" src={flagUSA}/>}
                        {locale === "pl" && <img className="flag" src={flagPL}/>}
                    </div>
                <div className="navButton" onMouseDown={handleMenu}> {authorization.username === undefined ? <FormattedMessage id="loginMessage"/>  : authorization.username} </div>
                </div>
            </nav>
            <div className="Menus">
                <div className={`ScrollMenu${isLangueageMenuActive ? ' visible' : ''}`}>
                    <div className="navButton menu" onMouseUp={() => {handleLanguageChange("en"); handleLanguageMenu();}}><img className="flag" src={flagUSA}/></div>
                    <div className="navButton menu" onMouseUp={() => {handleLanguageChange("pl"); handleLanguageMenu();}}><img className="flag" src={flagPL}/></div>
                </div>
                <div className={`ScrollMenu${isMenuActive ? ' visible' : ''}`}>
                    {authorization.role === undefined && <Link to="/Login" className="navButton menu" onMouseUp={() => handleMenu()}> <FormattedMessage id="loginButton"/> </Link>}
                    {authorization.role === undefined && <Link to="/Register" className="navButton menu" onMouseUp={handleMenu}> <FormattedMessage id="registerButton"/> </Link>}
                    {authorization.role !== undefined && <Link to="/PersonalInformation" className="navButton menu" onMouseUp={handleMenu}> <FormattedMessage id="personalInformation"/> </Link>}
                    {authorization.role !== undefined && <Link to="/Logout" className="navButton menu" onMouseUp={handleMenu}> <FormattedMessage id="logoutButton"/> </Link>}
                </div>
            </div>
        </>
    )
}

export default Navbar;