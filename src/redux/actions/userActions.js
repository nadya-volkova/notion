export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const loadUserFromLocalStorage = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  dispatch(setUser(user));
};

export const saveUserToLocalStorage = (user) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch(setUser(user));
};