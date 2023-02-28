import {Route, Routes} from 'react-router-dom';
import React from 'react';
import { PageHome } from '../Pages/PageHome';
import { PageCatalog } from '../Pages/PageCatalog';
import { PageAboutUs } from '../Pages/PageAboutUs';
import { PageAuth } from '../Pages/PageAuth';
import { PageCart } from '../Pages/PageCart';
import { PageFavourite } from '../Pages/PageFavourite';
import {PageCategoryDetails} from '../Pages/PageCategoryDetails';

export const PageRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PageHome/>}/>
            <Route path='/catalog' element={<PageCatalog/>}/>
            <Route path='/about' element={<PageAboutUs/>}/>
            <Route path='/cart' element={<PageCart/>}/>
            <Route path='/favourite' element={<PageFavourite/>}/>
            <Route path='/authentication' element={<PageAuth/>}/>
            <Route path='/categoriesdetails/:categoryname' element={<PageCategoryDetails/>}/>
        </Routes>
    )
}