import { createStore, applyMiddleware } from 'redux'
import {signUpReducer} from './reducers/signUp'
import thunk from 'redux-thunk'

export const store = createStore(signUpReducer, applyMiddleware(thunk))