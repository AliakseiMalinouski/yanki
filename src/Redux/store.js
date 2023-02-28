import {configureStore} from "@reduxjs/toolkit";
import navLinkSlice from "./Header/navLinkSlice";
import translateSlice from "./TranslateState/translateSlice";
import iconsSlice from "./Header/iconsSlice";
import categoriesSlice from "./Home/categoriesSlice";

export const store = configureStore({
    reducer: {
        navLinks: navLinkSlice,
        language: translateSlice,
        icons: iconsSlice,
        categories: categoriesSlice
    }
})