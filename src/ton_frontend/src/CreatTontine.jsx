import { useState } from 'react';

function CreerTontine({ onCreateTontine }) {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    nature: 1,
    frequence: 1,
    montant: 0.0,
    penal: 0.0,
    maxParticipants: 5,
    date: Date.now(),
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   onCreateTontine(formData.nom, formData.description, formData.nature, formData.frequence, parseFloat(formData.montant), parseFloat(formData.penal), parseInt(formData.maxParticipants), "CreateurId", formData.date);
  // }
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom de la tontine" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <select name="nature" value={formData.nature} onChange={handleChange}>
        <option value="0">Epargne</option>
        <option value="1">Cotisation</option>
        <option value="2">Investissement</option>
      </select>
      <input type="number" name="frequence" value={formData.frequence} onChange={handleChange} placeholder="Fréquence (en semaines)" required />
      <input type="number" name="montant" value={formData.montant} onChange={handleChange} placeholder="Montant" required />
      <input type="number" name="penal" value={formData.penal} onChange={handleChange} placeholder="Pénalité" required />
      <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} placeholder="Nombre max. de participants" required />
      <button type="submit">Créer Tontine</button>
    </form>
  );
}

export default CreerTontine;
