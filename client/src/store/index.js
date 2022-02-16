import { configureStore } from '@reduxjs/toolkit';
import auth from './auth.slice';


const Store = configureStore({
    reducer: {
        auth,   
    }
});

export default Store;