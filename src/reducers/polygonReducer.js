const polygonReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case "SET_POLYGON":
        return payload;
        break;
      default:
        return state;
        break;
    }
  };
  
  export default polygonReducer;
  