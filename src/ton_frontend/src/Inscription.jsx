import { useState } from 'react';

function Inscription({ onInscription }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    adresse: '',
    password: '',
    date: Date.now(),
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onInscription(formData.nom, formData.prenom, formData.tel, formData.email, formData.adresse, formData.password, formData.date);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
      <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
      <input type="text" name="tel" value={formData.tel} onChange={handleChange} placeholder="Téléphone" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Inscription;
