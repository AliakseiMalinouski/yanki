import {configureStore} from "@reduxjs/toolkit";
import navLinkSlice from "./Header/navLinkSlice";
import translateSlice from "./TranslateState/translateSlice";

export const store = configureStore({
    reducer: {
        navLinks: navLinkSlice,
        language: translateSlice,
    }
})