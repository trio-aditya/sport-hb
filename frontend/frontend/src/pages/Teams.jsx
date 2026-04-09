import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function Teams() {
    const { idLeague } = useParams();
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (idLeague) {
          getTeams();
          getFavorites();
          checkLogin();
        }
    }, [idLeague]);

    //Cek login user
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    }

    const getTeams = async () => {
        try {
            const res = await api.get(`/teams/${idLeague}`);
            setTeams(res.data.teams);
        } catch (err) {
            console.log(err);
        }
    };

    const getFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    const addFavorite = async (team) => {
      const token = localStorage.getItem("token");

      //Cek login
      if(!token) {
        alert("Please login!");
        navigate("/login");
        return;
      }

      try {
        if (favorites.find((f) => f.team_id == team.idTeam)) {
          alert("It's already in favorites!");
          return;
        }

        await api.post("/favorites", {
          team_id: team.idTeam,
          team_name: team.strTeam,
          team_badge: team.strBadge,
        });

        alert("Add favorite success.");

        getFavorites();
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
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
        {teams?.map((team) => (
          <div className="col-md-3 col-sm-6 mb-4" key={team.idTeam}>
            <div className="card h-100 shadow-sm team-card">
              <img src={team.strBadge} className="card-img-top team-img mt-4" alt={team.strTeam} />
              <div className="card-body text-center d-flex flex-column">
                <h6 className="card-title">{team.strTeam}</h6>
                <p className="text-muted small">{team.strLeague}</p>

                <button className="btn btn-outline-primary btn-sm mt-auto" onClick={() => navigate(`/matches/${team.idTeam}`)}>
                  Detail
                </button>
                <button className="btn btn-danger btn-sm mt-2" onClick={() => addFavorite(team)}>Favorite</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
