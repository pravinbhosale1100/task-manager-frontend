import { createContext, useState, useEffect } from "react";
import { decodeToken } from "../utils/jwtUtils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load token + user on refresh
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const decodedUser = decodeToken(token);
      setUser({
    userName:
      decodedUser?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role:
      decodedUser?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  });
    }
  },[]);

  // const login = (response) => {
  //   localStorage.setItem("token", response.token);
  //   localStorage.setItem("user", JSON.stringify(response.user));
  //   setUser(response.user);
  // };
  
  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = decodeToken(token);

    setUser({
    userName:
      decodedUser?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role:
      decodedUser?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
  });
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setUser(null);
  // };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  // return (
  //   <AuthContext.Provider value={{ user, login, logout }}>
  //     {children}
  //   </AuthContext.Provider>
  // );

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}


