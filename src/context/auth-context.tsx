import { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
