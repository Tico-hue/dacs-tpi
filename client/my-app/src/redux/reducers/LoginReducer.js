export const loginReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGGED":
      return {
        ...state,
        isLogged: true,
      };
    case "USER_REGISTER":
      return {
        ...state,
        isLogged: false,
      };
    default:
      return state;
  }
};
