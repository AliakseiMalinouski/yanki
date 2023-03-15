import {configureStore} from "@reduxjs/toolkit";
import navLinkSlice from "./Header/navLinkSlice";
import translateSlice from "./TranslateState/translateSlice";
import iconsSlice from "./Header/iconsSlice";
import categoriesSlice from "./Home/categoriesSlice";
import configLetterSlice from "./Subscribe/configLetterSlice";
import footerContentSlice from "./Footer/footerContentSlice";
import requestSlice from "./SuccessRequest/requestSlice";
import catalogItemsSlice from "./Catalog/catalogItemsSlice";
import currentCategorySlice from "./Catalog/currentCategorySlice";
import itemDetailSlice from "./Catalog/itemDetailSlice";
import favouriteSlice from "./Favourite/favouriteSlice";
import clothesSlice from "./Catalog/clothesSlice";
import topFilterSlice from "./Catalog/topFilterSlice";

export const store = configureStore({
    reducer: {
        navLinks: navLinkSlice,
        language: translateSlice,
        icons: iconsSlice,
        categories: categoriesSlice,
        letterConfig: configLetterSlice,
        footerContent: footerContentSlice,
        request: requestSlice,
        items: catalogItemsSlice,
        neededCategory: currentCategorySlice,
        itemDetails: itemDetailSlice,
        favourite: favouriteSlice,
        clothes: clothesSlice,
        topFilter: topFilterSlice
    }
})