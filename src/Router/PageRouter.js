import {Route, Routes} from 'react-router-dom';
import React, { Suspense } from 'react';
import { PageCatalog } from '../Pages/PageCatalog';
import { PageAboutUs } from '../Pages/PageAboutUs';
import { PageAuth } from '../Pages/PageAuth';
import { PageCart } from '../Pages/PageCart';
import { PageFavourite } from '../Pages/PageFavourite';
import {PageCategoryDetails} from '../Pages/PageCategoryDetails';
import {PageSuccessRequest} from '../Pages/PageSuccessRequest';
import { PageDetailtItem } from '../Pages/PageDetailsItem';
import { PageLogin } from '../Pages/PageLogin';
import { PageHistory } from '../Pages/PageHistory';
import { lazy } from 'react';
import { Progress } from '../components/Progress';

const HomeLazy = lazy(() => import('../Pages/PageHome'));

export const PageRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Suspense fallback={<Progress/>}>
                <HomeLazy/>
            </Suspense>}/>
            <Route path='/catalog' element={<PageCatalog/>}/>
            <Route path='/about' element={<PageAboutUs/>}/>
            <Route path='/cart' element={<PageCart/>}/>
            <Route path='/favourite' element={<PageFavourite/>}/>
            <Route path='/authentication' element={<PageAuth/>}/>
            <Route path='/categoriesdetails/:categoryname' element={<PageCategoryDetails/>}/>
            <Route path='/successrequestmessage' element={<PageSuccessRequest/>}/>
            <Route path='/detailsitem/:itemkey' element={<PageDetailtItem/>}/>
            <Route path='/login' element={<PageLogin/>}/>
            <Route path='/history' element={<PageHistory/>}/>
        </Routes>
    )
}