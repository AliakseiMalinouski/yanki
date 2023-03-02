import {configureStore} from "@reduxjs/toolkit";
import navLinkSlice from "./Header/navLinkSlice";
import translateSlice from "./TranslateState/translateSlice";
import iconsSlice from "./Header/iconsSlice";
import categoriesSlice from "./Home/categoriesSlice";
import configLetterSlice from "./Subscribe/configLetterSlice";
import footerContentSlice from "./Footer/footerContentSlice";
import requestSlice from "./SuccessRequest/requestSlice";

export const store = configureStore({
    reducer: {
        navLinks: navLinkSlice,
        language: translateSlice,
        icons: iconsSlice,
        categories: categoriesSlice,
        letterConfig: configLetterSlice,
        footerContent: footerContentSlice,
        request: requestSlice
    }
})