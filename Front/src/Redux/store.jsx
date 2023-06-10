import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlices/authSlice'
import categoriesReducer from './CategoriesSlice/categoriesSlice'
import ProductsSlice from './productsSlice/ProductsSlice'
import OrdersSlice from './OrdersSlice/OrdersSlice'
import CartSlice from './CartSlice/CartSlice'
import NavBarSlice from './NavBarSlice/NavBarSlice'
export const store = configureStore({
    reducer: {

        auth: authReducer,
        categories: categoriesReducer,
        products: ProductsSlice,
        orders: OrdersSlice,
        cart: CartSlice,
        navBar:NavBarSlice
    },
    devTools: true
})