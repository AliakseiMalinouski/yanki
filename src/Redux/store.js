import {configureStore} from "@reduxjs/toolkit";
import navLinkSlice from "./Header/navLinkSlice";

export const store = configureStore({
    reducer: {
        navLinks: navLinkSlice
    }
})