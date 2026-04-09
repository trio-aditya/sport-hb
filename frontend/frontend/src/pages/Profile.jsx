import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getFavorites();
  }, []);

  //Menampilkan data profil
  const getProfile = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Menampilkan data favorit
  const getFavorites = async () => {
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Hapus Data Favorit
  const removeFavorite = async (id) => {
    if (!id) {
      alert("ID not found.");
      return;
    }

    try {
      await api.delete(`/favorites/${id}`);
      alert("Deleted successfully.")
      getFavorites();
    } catch (err) {
      console.log(err);
      alert("Failed to deleted.")
    }
  };

  //Logout
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {}

    localStorage.removeItem("token");
    alert("Logout success.");
    navigate("/login");
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <h2>Profil Saya</h2>
        </div>
        <div className="col-md-2 text-end">
          <button className="btn btn-danger mt-auto" onClick={logout}>Logout</button>
        </div>
      </div>
      <hr />

      {user && (
        <div className="card p-3 mb-4">
          <h5>{user.name}</h5>
          <p>{user.email}</p>
        </div>
      )}

      <button className="btn btn-primary mt-auto" onClick={() => navigate("/")}>Lihat Liga</button>
      <hr />

      <h5 className="mt-4">Tim Favorit</h5>

      <div className="row">
        {favorites.map((fav) => (
          <div className="col-md-3" key={fav.id}>
            <div className="card p-3 text-center">
              <img src={fav.team_badge} style={{ height: "150px", objectFit: "contain", padding: "10px" }}  />
              <p>{fav.team_name}</p>

              <button className="btn btn-sm btn-danger" onClick={() => removeFavorite(fav.id_favorite_team)} >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;