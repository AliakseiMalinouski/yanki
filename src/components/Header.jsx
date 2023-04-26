import React from "react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navLinkThunk } from "../Redux/Header/navLinkThunk";
import { NavLinkHeader } from "./NavLinkHeader";
import { useLocation } from "react-router-dom";
import { TranslateSelect } from "./TranslateSelect";
import { Currency } from "./Currency";
import { ruNavLinkThunk } from "../Redux/Header/ruNavLinkThunk";
import { uaNavLinkThunk } from "../Redux/Header/uaNavLinkThunk";
import { iconsThunk } from "../Redux/Header/iconsThunk";
import { HeaderIcon } from "./HeaderIcons";
import { NewCollection } from "./NewCollection";
import { configureState } from "../Redux/Favourite/favouriteSlice";
import { getLengthOfArray } from "../helpers/getLengthOfArray";
import { ValuteSelect } from "./ValuteSelect";
import { yankiEvents } from "../events";
import { valuteThunk } from "../Redux/Header/valuteThunk";
import { changeValute, updateValute } from "../Redux/Header/valuteSlice";
import {paddingBottomOfValuteSelect, positionOfImageValuteSelect} from '../helpers/objectsOfStyles';
import { scrollToElement } from "../helpers/scroll";

export const Header = React.memo(() => {

    let dispatch = useDispatch();
    let location = useLocation();

    const navLinks = useSelector(state => state.navLinks.navLinks);
    const languageState = useSelector(state => state.language.language);
    const icons = useSelector(state => state.icons.icons);
    const itemsCart = useSelector(state => state.cart.items);
    const valuteArray = useSelector(state => state.valute.valuteArray);
    const currentValute = useSelector(state => state.valute.currentValute);

    const [currentPage, setCurrentPage] = useState("");
    const [lengths, setLengths] = useState({});
    const [valuteState, setValuteState] = useState(false);
    const [menuState, setMenuState] = useState(false);
    const [navState, setNavState] = useState(false);

    const fav = useSelector(state => state.favourite.favourite);

    useEffect(() => {
        const data = localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : [];
        if(data.length && !fav.length) {
            dispatch(configureState(data));
        }
    }, [fav, dispatch]);

    // useEffect(() => {
    //     let body = document.body;
    //     if(navState) {
    //         body.style.overflow = 'hidden';
    //     }
    //     else {
    //         body.style.overflow = '';
    //     }
    // }, [navState]);

    useEffect(() => {
        let pageLocation = location.pathname;
        setCurrentPage(pageLocation);
    }, [location]);

    useEffect(() => {
        if(!icons.length) dispatch(iconsThunk);
    }, [dispatch, icons]);

    const updateHeader = useCallback((language) => {
        if(language === 'en') {
            dispatch(navLinkThunk);
        }
        else if(language === 'ru') {
            dispatch(ruNavLinkThunk);
        }
        else if(language === 'ua') {
            dispatch(uaNavLinkThunk);
        }
    }, [dispatch]);

    useEffect(() => {
        updateHeader(languageState);
    }, [updateHeader, languageState]);

    useEffect(() => {
        if(!valuteArray.length) dispatch(valuteThunk);
    }, [dispatch, valuteArray]);

    useEffect(() => {
        let resize = window.matchMedia('(max-width: 560px)');
        if(resize.matches) setMenuState(true);
    }, []);

    const changeValuteParent = useCallback((valute) => {
        if(currentValute !== valute) {
            dispatch(changeValute(valute));
            setValuteState(prev => !prev);
            fetch(`https://v6.exchangerate-api.com/v6/5f6c169eb629a374b98a6f66/latest/${valute}`)
            .then(response => {
                if(!response.ok) {
                    alert('Error witn download');
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                dispatch(updateValute(data));
            })
            .catch(error => {
                alert(`Error type is ${error}`);
            })
        }
    }, [dispatch, currentValute]);

    useEffect(() => {
        yankiEvents.addListener('selectValute', changeValuteParent);
        yankiEvents.addListener('closeModal', closeModal);
        return () => {
            yankiEvents.removeListener('selectValute', changeValuteParent);
            yankiEvents.removeListener('closeModal', closeModal);
        }
    }, [changeValuteParent]);

    useEffect(() => {
        let saved = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setLengths(getLengthOfArray(fav, saved));
    }, [fav, itemsCart]);

    const closeModal = (state) => {
        if(state) setNavState(false);
    }
    
    let navLinksMemoizeed = useMemo(() => navLinks === undefined || navLinks === null || navLinks === []
    ?
    null
    :
    navLinks.map(e => <NavLinkHeader key={e.id} title={e.title} link={e.link} currentPage={currentPage}/>), [navLinks, currentPage]);

    let iconsMemoizeed = useMemo(() => icons === undefined || icons === null || icons === []
    ?
    null
    :
    icons.map(e => <HeaderIcon key={e.id} favouriteLength={lengths && lengths.firstLength} cartLength={localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length} link={e.link} alt={e.alt} image={e.image}/>), [icons, lengths])

    let valuteMemoizeed = useMemo(() => valuteArray && valuteArray.map(({id, valute}) => <ValuteSelect key={id} valute={valute}/>), [valuteArray]);


    return (
        <>
        <div className="HeaderContent">
            {
                menuState
                ?
                <>
                    <img src="https://i.ibb.co/km4vNVd/YANKI.png" className="Logo" alt="Logo"/>
                    {
                        navState
                        ?
                        null
                        :
                        <img onClick={() => {
                            setNavState(true);
                        }} src="https://i.ibb.co/hL66HBv/Group-1.png" alt="Menu"/>
                    }
                {
                    navState
                    ?
                    <div className="Modal">
                        <img src="https://img.icons8.com/emoji/256/cross-mark-emoji.png" alt="Cross close" onClick={() => {
                            setNavState(prev => !prev) }}/>
                        <ul className="NavLinks">
                {navLinksMemoizeed}
                    </ul>
                    <TranslateSelect menuState={menuState}/>
                    <ul className="ValuteSelect" style={paddingBottomOfValuteSelect}>
                {
                    !valuteState
                    ?
                    <li className="CurrentValuteStatic" style={{marginBottom: valuteState ? '8px' : '0px'}} onClick={() => setValuteState(prev => !prev)}>
                        <span>{currentValute}</span>
                        {
                            menuState ? null : <img src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/>
                        }
                        </li>
                    :
                    <>
                    <li style={valuteState ? {borderBottom: '1px solid black'} : {borderBottom: 'none'}} className="CurrentValuteStatic" onClick={() => setValuteState(prev => !prev)}>close</li>
                    <img style={positionOfImageValuteSelect} src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/>
                    {valuteMemoizeed}
                    </>
                }
            </ul>
                    </div>
                    :
                    null
                }
                </>
                :
                <>
                    <ul className="NavLinks">
                {navLinksMemoizeed}
            </ul>
            <img src="https://i.ibb.co/km4vNVd/YANKI.png" className="Logo" alt="Logo"/>
            <TranslateSelect/>
            <ul className="ValuteSelect" style={paddingBottomOfValuteSelect}>
                {
                    !valuteState
                    ?
                    <li className="CurrentValuteStatic" onClick={() => setValuteState(prev => !prev)}>
                        <span>{currentValute}</span>
                        <img src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/>
                        </li>
                    :
                    <>
                    <li className="CurrentValuteStatic" onClick={() => setValuteState(prev => !prev)}>close</li>
                    <img style={positionOfImageValuteSelect} src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/>
                    {valuteMemoizeed}
                    </>
                }
            </ul>
            <Currency/>
            <ul className="Icons">
                {iconsMemoizeed}
            </ul>
                </>
            }
        </div>
        {<NewCollection currentPage={currentPage}/>}
        </>
    )    
})