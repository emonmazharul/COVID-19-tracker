const users = [];

function addUser(username, city, id) {
  username = username.trim().toLowerCase();
  city = city.trim().toLowerCase();
  console.log(city);

  if (!username && !city) {
    return {
      error: "username and city must be valid",
    };
  }
  const existUser = users.find(
    (user) => user.username === username && user.city === city
  );
  if (existUser) {
    return {
      error: "username already in use ",
    };
  }
  const user = { username, city, id };
  users.push({ username, city, id });
  return { user };
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getUser(id) {
  const user = users.find((user) => user.id === id);
  if (user) {
    return user;
  }
}

function getUserInCity(city) {
  const userInCity = users.filter((user) => user.city === city);
  if (userInCity) {
    return userInCity;
  }
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInCity,
};
