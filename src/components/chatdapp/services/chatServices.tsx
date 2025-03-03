import { PublicKey } from "@solana/web3.js";
import { API_URL } from "@/settings";
import { getJWT } from "@/components/authentications/services/authServices";


export const createChatRoom = async (public_key: PublicKey, to_public_key: string) => {

  const response = await fetch(`${API_URL}/v1/create-new-singe-chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`
    },
    body: JSON.stringify(
      {
        public_key_initiator: public_key,
        public_key_receiver: to_public_key
      }
    ),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error('Failed to create chat room, check public key: ' + data.detail);
  }

  return await response.json();
}

export const getChatRooms = async (public_key: PublicKey) => {

  const response = await fetch(`${API_URL}/v1/get-chat-rooms/?public_key=${public_key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error('Failed to get chat rooms: ' + data.detail);
  }

  return await response.json();
}

export const sendChatMessage = async (public_key: PublicKey, to_public_key: string, message: string) => {

  const response = await fetch(`${API_URL}/v1/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`

    },
    body: JSON.stringify(
      {
        public_key: public_key,
        to_public_key: to_public_key,
        message: message
      }
    ),
  });

  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }
}

export const getChatMessages = async (public_key: PublicKey, to_public_key: string) => {

  const response = await fetch(`${API_URL}/v1/chat/?public_key=${public_key}&to_public_key=${to_public_key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get chat messages');
  }

  const data = await response.json();
  return data.messages
}
