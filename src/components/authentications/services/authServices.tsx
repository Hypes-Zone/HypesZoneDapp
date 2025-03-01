import { API_URL } from "@/settings";
import { PublicKey } from "@solana/web3.js";
import {jwtDecode} from "jwt-decode";

export const getCSRFMessage = async (public_key: PublicKey) => {

  const response = await fetch(`${API_URL}/v1/csrf-message/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        public_key: public_key
      }
    ),
  });

  if (!response.ok) {
    throw new Error('Failed to get CSRF message');
  }

  const data = await response.json();
  return data.message
}


export const signIn = async (public_key: PublicKey, signature: string) => {

  const response = await fetch(`${API_URL}/v1/sign-in/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        public_key: public_key,
        signature: signature
      }
    ),
  });

  if (!response.ok) {
    throw new Error('Failed to sign in');
  }

  const data = await response.json();
  return data.jwt
}

export const setJWT = (jwt: string) => {
  localStorage.setItem('jwt', jwt);
}

export const getJWT = () => {
  return localStorage.getItem('jwt');
}

export const signOut = () => {
  localStorage.removeItem('jwt');
}

export const isJWTValid = (jwt: string) => {
  let decodedToken = jwtDecode(jwt);

  if (!decodedToken || !decodedToken.exp) {
    console.log("No token found.");
    return false;
  }

  console.log("Decoded Token", decodedToken);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false;
  } else {
    console.log("Valid token");
    return true;
  }
}