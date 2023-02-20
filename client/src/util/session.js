export const register = user => (
    fetch("api/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  );
  export const login = user => (
    fetch("api/user/auth", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
  );
  export const logout = () => (
    fetch("api/auth", { method: "DELETE" })
  );