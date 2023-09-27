
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthSlice from "../slices/userSlice";
import adminAuthSlice from "../slices/adminSlice";


const userPersistConfig = { key: 'userAuth',storage,version: 1};
const userAuthPersistReducer = persistReducer(userPersistConfig,userAuthSlice);

const adminPersistConfig = { key: 'adminAuth',storage,version:1}
const adminAuthPersistReducer = persistReducer(adminPersistConfig,adminAuthSlice)



export const store = configureStore({
  reducer: {
    User: userAuthPersistReducer,
    Admin: adminAuthPersistReducer
  }
});

export const persistor = persistStore(store);
