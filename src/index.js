import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App';
import configureStore from './store/configureStore';
import { startGetUserInfo } from './actions/userActions';
import { startGetAllStudsInfo } from './actions/studentActions';
import { startGetStudInfo } from './actions/studentActions';

const store= configureStore()
console.log(store)

// console.log('index.js',localStorage.hasOwnProperty('token'), JSON.parse(localStorage.getItem('user')).role==='admin')
if(localStorage.hasOwnProperty('token') ){
  const user=JSON.parse(localStorage.getItem('user'))
  if(user.role==='admin'){
    store.dispatch(startGetUserInfo())
    store.dispatch(startGetAllStudsInfo())
  }else if(user.role==='student'){
    store.dispatch(startGetStudInfo(user._id))
  }
  
}

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,document.getElementById('root'));

