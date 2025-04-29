import { useAuth } from "@clerk/clerk-react";

export function useAuthToken() {
  const { getToken: clerk_getToken, isLoaded } = useAuth();
  
  const getToken = async () => {
    // if (!isLoaded)
    //   return console.error('Clerk not loaded');
    
    const res = await clerk_getToken();
    return res;
  };

  return { isLoaded, getToken };
}
