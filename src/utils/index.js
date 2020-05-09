export const getJwt = () => {
  const tokenContainer = {
    token: "",
    hasToken: false,
  };

  const getToken = localStorage.getItem("jwt-token");

  if (getToken === null) {
    console.log("has no token");
    return tokenContainer;
  }
  tokenContainer.token = `bearer ${getToken}`;
  tokenContainer.hasToken = true;

  return tokenContainer;
};
