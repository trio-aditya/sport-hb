import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function PrivateRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const check = async () => {
            try {
                await api.get("/profile");
                setIsAuth(true);
            } catch {
                localStorage.removeItem("token");
                setIsAuth(false);
            }
        };

        check();
    }, []);

    if (isAuth === null) return <p>Loading..</p>;

    return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;