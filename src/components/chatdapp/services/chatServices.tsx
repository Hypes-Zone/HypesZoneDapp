import { PublicKey } from "@solana/web3.js";
import { API_URL } from "@/settings";
import { getJWT } from "@/components/authentications/services/authServices";



export const createChatRoom = async (public_key: PublicKey, to_public_key: string) => {

  const response = await fetch(`${API_URL}/v1/chat-room/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`

    },
    body: JSON.stringify(
      {
        public_key: public_key,
        to_public_key: to_public_key
      }
    ),
  });

  if (!response.ok) {
    throw new Error('Failed to create chat room');
  }
}

export const getChatRooms = async (public_key: PublicKey) => {

  const response = await fetch(`${API_URL}/v1/chat-room/?public_key=${public_key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get chat rooms');
  }

  const data = await response.json();
  return data.chat_rooms
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
