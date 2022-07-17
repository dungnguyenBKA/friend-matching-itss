import React from "react";
import Column from "../../components/Column/Column";
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";

function ProfilePage() {
  const {user, signOut} = useAuth()
  return <Column>
    <p>Profile page</p>

    <p>email: {user.email}</p>
    <p>username: {user.name}</p>

    <Link to={'/'}>
      <button
        onClick={() => {
          signOut()
        }}>
        sign out
      </button>
    </Link>
  </Column>
}

export default ProfilePage
