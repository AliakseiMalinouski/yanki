import {Route, Routes} from 'react-router-dom';
import React from 'react';
import { PageHome } from '../Pages/PageHome';
import { PageCatalog } from '../Pages/PageCatalog';
import { PageAboutUs } from '../Pages/PageAboutUs';

export const PageRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PageHome/>}/>
            <Route path='/catalog' element={<PageCatalog/>}/>
            <Route path='/about' element={<PageAboutUs/>}/>
        </Routes>
    )
}