// Fonction pour récupérer les données de l'utilisateur

import { API } from 'src/config';


const getAccountFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');

  const account = {
    displayName: '',
    email: '',
    photoURL: '',
    role: '',
  };

  if (storedUser ) {
    // Convertir la chaîne JSON en objet JavaScript
    const userObject = JSON.parse(storedUser);

  if (userObject && userObject.helpdesk === true) {
    account.role = 'helpdesk';
  } else {
    account.role = 'technicien';
  }
    


    // Utilisez userObject et accédez à ses sous-éléments
    account.displayName = userObject?.email || ''; // Remplacez "name" par le nom réel de votre sous-élément
    account.email = userObject?.email || ''; // Remplacez "email" par le nom réel de votre sous-élément
    // Correction de la construction de l'URL de l'image
    const img = `${API}${userObject?.photo || ''}`;
    account.photoURL = img; // Remplacez "photo" par le nom réel de votre sous-élément
    // console.log(img);
    // console.log(userObject.photo);
  }



  return account;
};

// Utilisez la fonction pour obtenir l'objet account
const account = getAccountFromLocalStorage();


// Exportez l'objet account si nécessaire
export { account };
