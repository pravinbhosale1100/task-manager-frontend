import { createContext, useState, useEffect } from "react";

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
      setUser({isAuthenticated:true});
    }
  },[]);

  // const login = (response) => {
  //   localStorage.setItem("token", response.token);
  //   localStorage.setItem("user", JSON.stringify(response.user));
  //   setUser(response.user);
  // };
  
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({isAuthenticated:true});
  }

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


