import { AnyAction } from "redux";

const InitialState = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  password: null,
  userName: "",
  isLogged: false,
};

export const authReducer = (state = InitialState, action: AnyAction) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        data: action.data,
        isLogged: true,
      };
    case "SIGNOUT":
      return {
        InitialState,
        isLogged: false,
      };
    default:
      return InitialState;
  }
};
