import React from 'react'

export default function Logout() {
    const logout = async () => {
        try {
          await signOut(auth);
          console.log("sign out");
          setUser(null);
          navigate("/signin");
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div></div>
  )
}
