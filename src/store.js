import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from './redux/categoriesSlice'

export default configureStore({
    reducer: {
        categories: CategoryReducer
    },
})