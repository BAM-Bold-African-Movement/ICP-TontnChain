import { useState, useEffect } from 'react';
import { ton_backend } from 'declarations/ton_backend';

function UtilisateurTontine({ user }) {
  const [tontines, setTontines] = useState([]);

  useEffect(() => {
    if (user) {
      ton_backend.consulterMembresTontine(user.tel).then((result) => {
        setTontines(result);
      });
    }
  }, [user]);

  return (
    <div>
      <h2>Tontines de {user?.nom}</h2>
      {tontines.length > 0 ? (
        <ul>
          {tontines.map((tontine, index) => (
            <li key={index}>
              <h3>{tontine.nom}</h3>
              <p>{tontine.description}</p>
              <p>Solde: {tontine.solde}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune tontine trouvée</p>
      )}
    </div>
  );
}

export default UtilisateurTontine;
