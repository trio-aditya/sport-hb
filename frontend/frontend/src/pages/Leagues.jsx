import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Leagues() {
    const [leagues, setLeagues] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getLeagues();
        checkLogin();
    }, []);
 
    //Cek login user
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    }

    const getLeagues = async () => {
        try {
            const res = await api.get("/leagues");
            setLeagues(res.data.countries);
        } catch (err) {
            console.log(err);
        }
    };

    //Logout
    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/login");
    };

    return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <h2>Daftar Liga</h2>
        </div>
        <div className="col-md-2 text-end">
          {!isLogin ? (
            <button className="btn btn-success mt-auto" onClick={() => navigate(`/login`)}>Login</button>
          ) : (
            <>
              <button className="btn btn-info mt-auto" onClick={() => navigate(`/profile`)}>Profile</button>
              <button className="btn btn-danger mt-auto ms-2" onClick={handleLogout}>Logout</button>
            </>
          )}
          
        </div>
      </div>
      <hr />

      <div className="row">
        {leagues.map((league) => (
          <div className="col-md-3 mb-3" key={league.idLeague}>
            <div className="card h-100">
              <img
                src={league.strBadge}
                className="card-img-top" style={{ height: "250px", objectFit: "contain", padding: "10px" }}
                alt={league.strLeague}
              />
              <div className="card-body">
                <h5 className="card-title">{league.strLeague}</h5>
                <p className="card-text">{league.strSport}</p>
                <button className="btn btn-primary mt-auto" onClick={() => navigate(`/teams/${league.strLeague}`)}>Lihat Tim</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leagues;

