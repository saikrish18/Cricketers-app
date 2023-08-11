import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getPlayers, { TPlayer } from "./getPlayers";
import "../css/CricketersList.css";

function CricketersList() {
  const [players, setPlayers] = useState<TPlayer[]>([]);

  useEffect(() => {
    getPlayers().then((data) => setPlayers(data));
  }, []);

  return (
    <div className="cricketers-list">
      <h2>Cricketers List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="cricketer-item">
            <Link to={`/cricketer/${player.id}`} className="cricketer-link">{player.name}
            </Link> -{" "}
            <span className="cricketer-type">{player.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CricketersList;
