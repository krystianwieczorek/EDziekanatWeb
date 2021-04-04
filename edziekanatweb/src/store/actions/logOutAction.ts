export const logOutAction = () => async (dispatch: any) => {
  await dispatch({ type: "SIGNOUT" });
};
