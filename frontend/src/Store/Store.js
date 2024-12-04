import { configureStore } from "@reduxjs/toolkit";
import SetReducer from "./Context.js"
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";

const config = {
    key:"root",
    storage,
}
const rootReducer = combineReducers({
    user: SetReducer, 
  });


  const persistedReducer = persistReducer(config, rootReducer)

const store = configureStore({
reducer:{persistedReducer}

})
export const persistor = persistStore(store)
export default store