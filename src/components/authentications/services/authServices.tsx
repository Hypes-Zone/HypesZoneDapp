import { API_URL } from "@/settings";
import { PublicKey } from "@solana/web3.js";


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