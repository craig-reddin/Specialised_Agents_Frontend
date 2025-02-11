import { useAuth0 } from "@auth0/auth0-react";

export const User = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated && <p className="userData">{JSON.stringify(user)}</p>;
};

export default User;
