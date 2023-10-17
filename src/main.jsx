import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from "react-redux"
import {store,persistor} from "./redux/store/store.js"
import { PersistGate } from 'redux-persist/es/integration/react'
import.meta.env.VITE_BACKEND_URL


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  {/* <React.StrictMode> */}
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  {/* </React.StrictMode> */}
  </GoogleOAuthProvider>,
)
