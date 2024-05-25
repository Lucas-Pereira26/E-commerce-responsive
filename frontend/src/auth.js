function isAuthentication() {
    return localStorage.getItem("token") !== null;
  }
  
  export default isAuthentication;
  