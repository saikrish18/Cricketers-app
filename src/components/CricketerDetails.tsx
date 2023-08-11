import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getPlayers, { TPlayer } from "./getPlayers";
import "../css/CricketerDetails.css";

function CricketerDetails() {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<TPlayer | undefined>(undefined);
  const [similarPlayers, setSimilarPlayers] = useState<TPlayer[]>([]);

  useEffect(() => {
    getPlayers().then((data) => {
      const selectedPlayer = data.find((p) => p.id === id);

      if (selectedPlayer) {
        setPlayer(selectedPlayer);

        const similar = data.filter(
          (p) => p.type === selectedPlayer.type && p.id !== selectedPlayer.id
        );
        setSimilarPlayers(similar.slice(0, 5));
      }
    });
  }, [id]);

  return (
    <div>
      <h2 className="CricketerDetails">Cricketer Details</h2>
      {player && (
        <div className="cricketer-info">
          <h3>{player.name}</h3>
          <p>Type: {player.type}</p>
          <p>Points: {player.points}</p>
          <p>
            Date of Birth: {new Date(player.dob || "").toLocaleDateString()}
          </p>
          <p>Description: {player.description}</p>
        </div>
      )}
      <h3 className="Similar-Players">Similar Players</h3>
      <ul>
        {similarPlayers.map((similarPlayer) => (
          <li key={similarPlayer.id} className="similar-player-item" >
            <Link to={`/cricketer/${similarPlayer.id}`} className="cricketer-link">
              {similarPlayer.name}
            </Link>{" "}
           <span className="cricketer-type">- {similarPlayer.type} - Points: {similarPlayer.points} </span>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-link">Back to Cricketers</Link>
    </div>
  );
}

export default CricketerDetails;
