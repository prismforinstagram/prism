import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { API_URL, defaultHeaders } from './config';
import { useAuth } from '../../context/AuthContext';

const InstagramAPIContext = createContext({});

const InstagramAPIContextProvider = ({ children }: PropsWithChildren) => {
  // @ts-ignore
  const { authToken } = useAuth();

  const listPosts = async () => {
    const res = await fetch(`${API_URL}/api/v1/feed/timeline/`, {
		method: 'POST',
		headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${authToken}`,
    }
  });
	const json = await res.json();
    if (res.status === 401) {
      throw new Error('Not authorized. Please sign in');
    }
    if (res.status !== 200) {
      throw new Error('Error fetching posts');
    }
    return json.feed_items.filter((item: any) => item.hasOwnProperty("media_or_ad"));
  };

  return (
    <InstagramAPIContext.Provider
      value={{
        listPosts,
      }}
    >
      {children}
    </InstagramAPIContext.Provider>
  );
};

export default InstagramAPIContextProvider;

export const InstagramPostAPI = () => useContext(InstagramAPIContext);