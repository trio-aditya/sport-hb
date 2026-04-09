import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async() => {
        try {
            const res = await api.post("/login", { email, password });

            // console.log(res.data);

            const token = res.data.token;
            localStorage.setItem("token", token);

            alert("Login success.");
            
            navigate("/profile");
        } catch (err) {
            console.log(err.response?.data);
            alert("Login failed.");
        }
    };

    return (
        <div className="container mt-5">
            
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-success mt-auto" onClick={() => navigate(`/`)}>Home</button>
                    <button className="btn btn-info mt-auto ms-2" onClick={() => navigate(`/register`)}>Register</button>
                </div>
            </div>
            <hr />

            <h3>Login</h3>
            <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
    );
}

export default Login;