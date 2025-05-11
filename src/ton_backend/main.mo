import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";

actor {
    var i: Nat = 0;

    // Définition du type User
    type User = {
        nom: Text;
        prenom: Text;
        tel: Text;
        email: Text;
        address: Text;
        password: Text;
        children: [User];
        dateInscription: Nat64;
    };
    
    // État d'une tontine
    type Etat = {
        #Pending;
        #Going;
        #Ended;
    };
    
    // Type de tontine
    type Nature = {
        #Epargne;
        #Cotisation;
        #Investissement;
    };
    
    type Contribution = {
        sender: User;
        receiver: User;
        amount: Float;
        date: Nat;
    };
    
    // Type Tontine
    type Tontine = {
        id: Text;
        nom: Text;
        description: Text;
        etat: Etat;
        nature: Nature;
        frequence: Nat;
        montant: Float;
        penal: Float;
        maxPart: Nat;
        debut: Nat;
        fin: Nat;
        creator: Text;
        participants: [User];
        contributions: [Contribution];
        solde: Float;
        dernierCollecteur: ?User;
        collecteEnCours: Bool;
    };

    // Liste des utilisateurs enregistrés
    var utilisateurs = HashMap.HashMap<Text, User>(10, Text.equal, Text.hash);

    // HashMap pour les tontines
    var tontines = HashMap.HashMap<Text, Tontine>(10, Text.equal, Text.hash);

    // Fonction pour générer un ID unique basé sur le temps actuel
    func genererId() : Text {
        i := i + 1; // Incrémenter i pour générer un ID unique
        return Nat.toText(i);
    };

    // Fonction pour enregistrer un utilisateur
    public func inscription(nom: Text, prenom: Text, tel: Text, email: Text, adresse: Text, password: Text, date: Nat64) : async () {
        let nouvelUtilisateur : User = {
            nom = nom;
            prenom = prenom;
            tel = tel;
            email = email;
            address = adresse;
            password = password;
            children = [];
            dateInscription = date;
        };
        utilisateurs.put(tel, nouvelUtilisateur);
    };

    // Fonction pour créer une nouvelle tontine
    public func creerTontine(nom: Text, description: Text, nat: Nature, freq: Nat, mont: Float, penal: Float, nombreParticipantsMax: Nat, createur: Text, date: Nat) : async () {
        switch (utilisateurs.get(createur)) {
            case (?createurUtilisateur) {
                let nouvelleTontine : Tontine = {
                    id = genererId();
                    nom = nom;
                    description = description;
                    nature = nat;
                    frequence = freq;
                    montant = mont;
                    penal = penal;
                    participants = [createurUtilisateur];
                    maxPart = nombreParticipantsMax;
                    debut = date;
                    fin = 0;
                    creator = createur;
                    contributions = [];
                    solde = 0.0;
                    etat = #Pending;
                    dernierCollecteur = null;
                    collecteEnCours = false;
                };
                tontines.put(nouvelleTontine.id, nouvelleTontine);
            };
            case (_) { }
        }
    };

    // Fonction pour rejoindre une tontine
    public func rejoindreTontine(tontineId: Text, utilisateurTel: Text) : async Bool {
        switch (tontines.get(tontineId)) {
            case (?tontine) {
                let participantExists = Array.find(tontine.participants, func (u: User) : Bool {
                    u.tel == utilisateurTel
                });
                switch (utilisateurs.get(utilisateurTel)) {
                    case (?utilisateur) {
                        if (participantExists != null) {
                            return false; // Déjà membre
                        };
                        if (Array.size(tontine.participants) >= tontine.maxPart) {
                            return false; // Max atteint
                        };
                        let nouvelleListeParticipants = Array.append(tontine.participants, [utilisateur]);
                        tontines.put(tontineId, {
                            id = tontine.id;
                            nom = tontine.nom;
                            description = tontine.description;
                            nature = tontine.nature;
                            frequence = tontine.frequence;
                            montant = tontine.montant;
                            penal = tontine.penal;
                            participants = nouvelleListeParticipants;
                            maxPart = tontine.maxPart;
                            debut = tontine.debut;
                            fin = tontine.fin;
                            creator = tontine.creator;
                            contributions = tontine.contributions;
                            solde = tontine.solde;
                            etat = tontine.etat;
                            dernierCollecteur = tontine.dernierCollecteur;
                            collecteEnCours = tontine.collecteEnCours;
                        });
                        return true;
                    };
                    case (_) { return false; }
                };
            };
            case (_) { return false; }
        }
    };

}
