let users = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@email.com', password: '1234' },
  { id: 2, nom: 'Martin', prenom: 'Marie', email: 'marie.martin@email.com', password: 'abcd' },
  { id: 3, nom: 'Durand', prenom: 'Paul', email: 'paul.durand@email.com', password: 'pass' },
];

export const getUsers = (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(users.slice(0, limit));
  }
  res.status(200).json(users);
};


export const getUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error(`A user with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(user);
};

export const createUser = (req, res, next) => {
  const { nom, prenom, email, password } = req.body;
  if (!nom || !prenom || !email || !password) {
    const error = new Error(`Veuillez remplir tous les champs`);
    error.status = 400;
    return next(error);
  }
  const newUser = {
    id: users.length + 1,
    nom,
    prenom,
    email,
    password,
  };
  users.push(newUser);
  res.status(201).json(users);
};

export const updateUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error(`A user with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  const { nom, prenom, email, password } = req.body;
  if (nom) user.nom = nom;
  if (prenom) user.prenom = prenom;
  if (email) user.email = email;
  if (password) user.password = password;

  res.status(200).json(users);
};

export const deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    const error = new Error(`A user with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  users = users.filter((user) => user.id !== id);
  res.status(200).json(users);
};
