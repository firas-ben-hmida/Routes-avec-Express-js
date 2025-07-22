const output = document.querySelector('#output');
const button = document.querySelector('#get-users-btn');
const form = document.querySelector('#add-user-form');

async function showUsers() {
  try {
    const res = await fetch('http://localhost:8000/api/users');
    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    const users = await res.json();
    output.innerHTML = '';
    users.forEach((user) => {
      const userEl = document.createElement('div');
      userEl.textContent = `${user.nom} ${user.prenom} (${user.email})`;
      output.appendChild(userEl);
    });
  } catch (error) {
    console.log('Erreur lors de la récupération : ', error);
  }
}

async function addUser(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const nom = formData.get('nom');
  const prenom = formData.get('prenom');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom, prenom, email, password }),
    });

    if (!res.ok) {
      throw new Error('Erreur lors de l\'ajout');
    }

    await res.json();
    showUsers();
  } catch (error) {
    console.error('Erreur lors de l\'ajout');
  }
}

button.addEventListener('click', showUsers);
form.addEventListener('submit', addUser);
