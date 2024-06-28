import { configureStore } from "@reduxjs/toolkit"
import x from "./counter/counterSlice"

export const store = configureStore({
    reducer: {
        counter: x,
    }
})