import { useState } from 'react';
import { ton_backend } from 'declarations/ton_backend';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inscription from './Inscription';
import CreerTontine from './CreatTontine';
import UtilisateurTontine from './Hole';

function App() {
  const [greeting, setGreeting] = useState('');
  const [user, setUser] = useState(null);

  // Fonction d'inscription de l'utilisateur
  async function handleInscription(nom, prenom, tel, email, adresse, password, date) {
    await ton_backend.inscription(nom, prenom, tel, email, adresse, password, date);
    setUser({ nom, prenom, tel, email });
  }

  // Fonction pour créer une tontine
  async function handleCreateTontine(nom, description, nature, frequence, montant, penal, maxParticipants, createur, date) {
    await ton_backend.creerTontine(nom, description, nature, frequence, montant, penal, maxParticipants, createur, date);
  }

  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/inscription">Inscription</Link></li>
            <li><Link to="/creer-tontine">Créer une Tontine</Link></li>
            <li><Link to="/utilisateur-tontine">Utilisateur Tontine</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Inscription onInscription={handleInscription} />} />
          <Route path="/creer-tontine" element={<CreerTontine onCreateTontine={handleCreateTontine} />} />
          <Route path="/utilisateur-tontine" element={<UtilisateurTontine user={user} />} />
        </Routes>
      </main>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Bienvenue sur la plateforme de gestion de tontine</h1>
      <p>Connectez-vous ou inscrivez-vous pour commencer.</p>
    </div>
  );
}

export default App;
