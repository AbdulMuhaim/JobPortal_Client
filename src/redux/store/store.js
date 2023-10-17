
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthSlice from "../slices/userSlice";
import adminAuthSlice from "../slices/adminSlice";
import employerAuthSlice from "../slices/employerSlice"


const userPersistConfig = { key: 'userAuth',storage,version: 1};
const userAuthPersistReducer = persistReducer(userPersistConfig,userAuthSlice);

const adminPersistConfig = { key: 'adminAuth',storage,version:1}
const adminAuthPersistReducer = persistReducer(adminPersistConfig,adminAuthSlice)

const employerPersistConfig = { key: 'employerAuth',storage,version:1};
const employerAuthPersistReducer = persistReducer(employerPersistConfig,employerAuthSlice)



export const store = configureStore({
  reducer: {
    User: userAuthPersistReducer,
    Admin: adminAuthPersistReducer,
    Employer: employerAuthPersistReducer
  }
});

export const persistor = persistStore(store);
