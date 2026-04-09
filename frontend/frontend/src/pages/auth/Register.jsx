import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        await api.post("/register", { name, email, password });
        alert("Register successs");
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-success mt-auto" onClick={() => navigate(`/`)}>Home</button>
                    <button className="btn btn-info mt-auto ms-2" onClick={() => navigate(`/login`)}>Login</button>
                </div>
            </div>
            <hr />

            <h3>Register</h3>
            <input className="form-control mb-2" placeholder="Name" onChange={e => setName(e.target.value)} />
            <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={register}>Register</button>
        </div>
    );
}