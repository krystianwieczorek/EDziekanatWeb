export const loggInAction = (data: any) => async (dispatch: any) => {
  await dispatch({ type: "SIGNIN", data });
};
