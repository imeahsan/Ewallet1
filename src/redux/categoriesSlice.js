import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
    { id: 1, title: "Grocery", },
    { id: 2, title: "Bills", },



]


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categoryAdded: {
            reducer(state, action) {
                state.push(action.payload)
            }, prepare(title) {//callback to prepare payload in proper format
                return {
                    payload: {
                        id: nanoid(),
                        title,
                    
                    }
                }
            }
        },



    }
})
export const { categoryAdded } = categorySlice.actions
export const selectAlcategory = (state) => state.category
export default categorySlice.reducer;