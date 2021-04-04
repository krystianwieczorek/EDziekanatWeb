import { createSelector } from "reselect";

const authSelector = (state: any) => state.auth;

export const loggeInSelector = createSelector(
  authSelector,
  (state: any) => state.isLogged
);
