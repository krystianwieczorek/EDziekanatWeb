import { createSelector } from "reselect";

const authSelector = (state: any) => state.auth;

export const loggedInSelector = createSelector(
  authSelector,
  (state: any) => state.isLogged
);

export const userIdSelector = createSelector(
  authSelector,
  (state: any) => state?.data?.id
);
