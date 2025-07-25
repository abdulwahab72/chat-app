// import { loginUser } from "@/services/auth/auth";
// import { createContext, useEffect, useState } from "react";
// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//     setIsLoading(false);
//   }, []);
//   const login = async (formData) => {
//     setIsLoading(true);
//     const handleLogin=async()=>{
//       const response=  await loginUser(formData);
//     if(response?.token){
//         localS
//     }
// }
//   };
// };
