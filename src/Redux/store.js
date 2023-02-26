import {configureStore} from "@reduxjs/toolkit";
import navLinkSlice from "./Header/navLinkSlice";
import translateSlice from "./TranslateState/translateSlice";
import iconsSlice from "./Header/iconsSlice";

export const store = configureStore({
    reducer: {
        navLinks: navLinkSlice,
        language: translateSlice,
        icons: iconsSlice,
    }
})