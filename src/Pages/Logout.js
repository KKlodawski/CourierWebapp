import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        Cookies.remove("jwt");
        Cookies.remove("role");
        Cookies.remove("username");
        navigate("/");
        window.location.reload();
    }, []);

    return (
        <>
        </>
    )
}

export default Logout;