import { configureStore, applyMiddleware } from "@reduxjs/toolkit"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../reducer/index'


const store = configureStore({
               reducer:rootReducer, 
               composeWithDevTools:composeWithDevTools(applyMiddleware(thunk))
            })

export default store;