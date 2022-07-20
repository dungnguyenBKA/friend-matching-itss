import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import Column from "../../components/Column/Column";
import Row from "../../components/Row/Row";
import AppStyles from "../../AppStyles"
import {database} from "../../firebase";
import UserModel from "../../models/UserModel";
import {onValue, ref} from "firebase/database";
import UserItem from "./UserItem";

const AdminPage: React.FC = () => {
  const {signOut} = useAuth()
  const [search, setSearch] = useState('')
  const [allUsersObject, setAllUsersObject] = useState({})

  const allUsers: UserModel[] = Object.values(allUsersObject)

  const filterUsers = allUsers.filter((item) => {
    const _search = search.toLowerCase()
    return item.name?.toLowerCase().includes(_search) ||
      item.email?.toLowerCase().includes(_search)
  })

  async function loadGetAllUsers() {
    try {

    } catch (e) {

    } finally {

    }
  }

  useEffect(() => {
    const unSub = onValue(ref(database, 'users'), (snapshot) => {
      const data = snapshot.val();
      setAllUsersObject(data);

      return () => {
        unSub()
      }
    })
  }, [])


  return <Column style={{
    padding: 16
  }}>
    <Row style={AppStyles.alignRow}>
      <h1 style={{
        flexGrow: 1
      }}>Administrator</h1>

      <input
        style={{
          fontSize: 20
        }}
        placeholder={"Search user"}
        onChange={(event) => {
          setSearch(event.target.value)
        }}
        value={search}/>
      <Link to={"/"}>
        <button
          style={{
            fontSize: 20,
            marginLeft: 10
          }}
          onClick={signOut}>
          Sign out
        </button>
      </Link>
    </Row>

    <h2>
      All users
    </h2>

    {
      filterUsers.map((item) => {
        return <UserItem item={item}/>
      })
    }


  </Column>
}

export default AdminPage
