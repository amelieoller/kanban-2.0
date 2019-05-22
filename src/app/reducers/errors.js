const errors = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR': {
      const { error } = action.payload;

      return state.concat([error]);
    }

    case 'REMOVE_ERROR': {
      return state.filter((error, i) => i !== action.index);
    }

    default:
      return state;
  }
};

export default errors;
