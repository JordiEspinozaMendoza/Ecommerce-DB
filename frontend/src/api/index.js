import axios from "axios";

export const callApi = (url, method, body, constants) => async (dispatch) => {
  const { REQUEST, SUCESS, FAIL } = constants;
  try {
    dispatch({ type: REQUEST });

    const { data } = await axios({
      method,
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: SUCESS, payload: data });
  } catch (error) {
    let response = JSON.stringify(error.response.data["detail"]);

    const unquoted = response.replace(/['"]+/g, '')

    dispatch({
      type: FAIL,
      payload: unquoted,
    });
  }
};
