import { AnyAction } from "redux";

const InitialState = {
  firstName: "",
  lastName: "",
  email: "",
  userId: "",
  channelId: 0,
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
