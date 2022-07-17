import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import UserModel from "../../models/UserModel";

interface AuthData {
  user?: UserModel
}

const initData: AuthData = {
  user: undefined
}

const userSlice = createSlice({
  name: "user",
  initialState: initData,
  reducers: {
    signIn(state, payload: PayloadAction<AuthData>) {
      return payload.payload
    },
    signOut() {
      return initData
    }
  }
})

export const {signIn, signOut} = userSlice.actions
export default userSlice.reducer
