import {createContext} from "react";
import {AuthenticationModel} from "../models/AuthenticationModel";

export const AuthenticationContext = createContext({
  authentication: null,
  setAuthentication: (authentication: AuthenticationModel | null) => {
  }
})