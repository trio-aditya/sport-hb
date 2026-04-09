import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function Matches() {
  const { teamId } = useParams();

  const [team, setTeams] = useState(null);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID:", teamId);
    if (teamId) {
      getMatches();
    }
  }, [teamId]);

  const getMatches = async () => {
    try {
      const res = await api.get(`/matches/${teamId}`);

      setTeams(res.data.team);
      setMatches(res.data.matches || []);
      setStandings(res.data.standings || []);
    } catch (err) {
      console.log(err);
    }
  };

  //Mengubah waktu ke WIB
  const convertToWIB = (date, time) => {
    if (!date || !time) return "-";

    const utc = new Date(`${date}T${time}Z`);
    return utc.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  return (
    <div className="container mt-4">

      <div className="row">
        <div className="col-md-10">
          <h2>Detail</h2>
        </div>
        <div className="col-md-2 text-end">
            <button className="btn btn-success mt-auto" onClick={() => navigate(`/`)}>Home</button>
        </div>
      </div>
      <hr />

      {/* Start detail tim */}
      {team && (
        <div className="card mb-4 p-3 text-center">
          <img src={team.strBadge} alt={team.strTeam} style={{ height: "250px", objectFit: "contain", padding: "10px" }} />
          <h4>{team.strTeam}</h4>
          <p className="text-muted">{team.strLeague}</p>
        </div>
      )}
      {/* End detail tim */}

      {/* Start menampilkan pertandingan yang sudah berlalu */}
      <h5>Previous Match</h5>
      <div className="row mb-4">
        {matches.length > 0 ? (
          matches.map((m) => (
            <div className="col-md-6 mb-3" key={m.idEvent}>
              <div className="card p-3">
                <h6>{m.strEvent}</h6>
                <p>{convertToWIB(m.dateEvent, m.strTime)}</p>
                <p>
                  {m.intHomeScore ?? "-"} vs {m.intAwayScore ?? "-"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada match</p>
        )}
      </div>
      {/* End menampilkan pertandingan yang sudah berlalu */}

      {/* Start menampilkan klasemen liga */}
      <h5>Klasemen Liga</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tim</th>
              <th>P</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings?.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.strTeam}</td>
                <td>{s.intPlayed}</td>
                <td>{s.intPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* End menampilkan klasemen liga */}

    </div>
  );
}

export default Matches;