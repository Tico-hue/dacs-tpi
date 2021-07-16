export const userLogged = (isLogged) => {
  return {
    type: "USER_LOGGED",
    payload: isLogged,
  };
};

export const userRegister = (isLogged) => {
  return {
    type: "USER_REGISTER",

    payload: isLogged,
  };
};
