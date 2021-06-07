export const studentIdAction = (data: any) => async (dispatch: any) => {
  await dispatch({ type: "STUDENTID", data });
};
