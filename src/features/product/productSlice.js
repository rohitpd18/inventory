import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productName: "",
    category: "",
    quantity: "",
    sku: "",
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.value = action.payload
        }
    }
})