import { createSelector } from "reselect";

const authSelector = (state: any) => state.auth;

export const loggedInSelector = createSelector(
  authSelector,
  (state: any) => state.isLogged
);

export const userIdSelector = createSelector(
  authSelector,
  (state: any) => state?.data?.user.id
);

export const userFirstName = createSelector(
  authSelector,
  (state: any) => state?.data?.user.firstName
);

export const userLastName = createSelector(
  authSelector,
  (state: any) => state?.data?.user.lastName
);

export const userRoleSelector = createSelector(
  authSelector,
  (state: any) => state?.data?.grantedRoleIds
);

export const deanOfficeIdSelector = createSelector(
  authSelector,
  (state: any) => state?.data?.user.deansOfficeId
);
