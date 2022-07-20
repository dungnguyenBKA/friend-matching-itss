import React from "react";
import Row from "../../components/Row/Row";
import Column from "../../components/Column/Column";
import {updateUser} from "../../firebase";
import UserModel from "../../models/UserModel";

interface UserItemProps {
  item: UserModel
}

const UserItem: React.FC<UserItemProps> = (props) => {
  const {item} = props
  const isLock = item.isLock === true
  return <Row
    key={item.email}
    style={{
      padding: 16,
      alignItems: 'center',
    }}>
    <img
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
      }}
      src={item?.image || "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI="}
      alt={"avatar"}/>
    <Column
      style={{
        marginLeft: 16,
        flexGrow: 1
      }}>
      <h5>Email :{item.email}</h5>
      <h4>Name: {item.name}</h4>
    </Column>

    <button
      onClick={async () => {
        if (isLock) {
          // unlock
          await updateUser(item.email, {
            ...item,
            isLock: false
          })
        } else {
          await updateUser(item.email, {
            ...item,
            isLock: true
          })
        }
      }}
      style={{
        fontSize: 16
      }}>
      {
        isLock ? "Unlock" : "Lock"
      }
    </button>
  </Row>
}

export default React.memo(UserItem, (prevProps, nextProps) => {
  return prevProps.item.email === nextProps.item.email &&
    prevProps.item.isLock === nextProps.item.isLock &&
    prevProps.item.name === nextProps.item.name &&
    prevProps.item.image === nextProps.item.image
})
