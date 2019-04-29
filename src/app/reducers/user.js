// user object is set server side and is never updated client side but this empty reducer is still needed
const user = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_USER": {
      const { accessToken, expiryDate, jwt } = action.payload;

			return { ...state, accessToken, expiryDate, jwt };
    }
    default:
      return state;
  }
};

export default user;
