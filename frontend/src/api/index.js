import axios from "axios";

export const callApi = (url, method, body, constants) => async (dispatch) => {
  const { REQUEST, SUCESS, FAIL } = constants;
  try {
    dispatch({ type: REQUEST });

    const { data } = await axios({
      baseUrl: BASE_URL,
      method,
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL,
      payload: error.message,
    });
  }
};
