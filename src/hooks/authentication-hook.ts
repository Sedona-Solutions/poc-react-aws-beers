import axios, {AxiosResponse} from "axios";
import {useContext} from "react";
import {AuthenticationContext} from "../contexts/authentication-context";
import {AuthenticationModel} from "../models/AuthenticationModel";

interface CognitoAuthResponse {
  AuthenticationResult: {
    IdToken: string;
  }
}

const LOCAL_STORAGE_AUTH_TOKEN_KEY = "BEERS_AUTHENTICATION_TOKEN_KEY";

export const useAuthentication = () => {
  const authenticationContext = useContext(AuthenticationContext);

  const login = async (username, password): Promise<void> => {
    const data = {
      "AuthParameters": {
        "USERNAME": username,
        "PASSWORD": password
      },
      "AuthFlow": "USER_PASSWORD_AUTH",
      "ClientId": "729ue0dfk7fq2psj2iep6qobpj"
    }
    const config = {
      headers: {
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        'Content-Type': 'application/x-amz-json-1.1'
      }
    }
    const response: AxiosResponse<CognitoAuthResponse> = await axios.post('https://cognito-idp.eu-west-1.amazonaws.com/', data, config);
    const accessToken = response.data.AuthenticationResult.IdToken;
    const authentication = {
      username: username,
      token: accessToken
    };
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, JSON.stringify(authentication));
    authenticationContext.setAuthentication(authentication);
    setAuthenticationInterceptor(accessToken);
  }

  const logout = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    authenticationContext.setAuthentication(null);
  }

  const retrieveAuth = (): AuthenticationModel | null => {
    const localStorageAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const authentication: AuthenticationModel = localStorageAuth ? JSON.parse(localStorageAuth) : null;
    if (authentication) {
      setAuthenticationInterceptor(authentication.token);
    }
    return authentication;
  }

  const authentication = authenticationContext.authentication;

  return {
    login,
    logout,
    retrieveAuth,
    authentication,
  };
}

const setAuthenticationInterceptor = (token: string) => {
  axios.interceptors.request.use(function (config) {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
}