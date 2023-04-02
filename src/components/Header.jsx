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

export const Header = React.memo(() => {

    let dispatch = useDispatch();
    let location = useLocation();

    const navLinks = useSelector(state => state.navLinks.navLinks);
    const languageState = useSelector(state => state.language.language);
    const icons = useSelector(state => state.icons.icons);
    const itemsCart = useSelector(state => state.cart.items);
    const valuteArray = useSelector(state => state.valute.valuteArray);
    const currentValute = useSelector(state => state.valute.currentValute);
    const allValutes = useSelector(state => state.valute.all);

    const [currentPage, setCurrentPage] = useState("");
    const [lengths, setLengths] = useState({});
    const [valuteState, setValuteState] = useState(false);

    const fav = useSelector(state => state.favourite.favourite);

    useEffect(() => {
        const data = localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : [];
        if(data.length && !fav.length) {
            dispatch(configureState(data));
        }
    }, [fav, dispatch]);


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
        return () => {
            yankiEvents.removeListener('selectValute', changeValuteParent);
        }
    }, [changeValuteParent]);

    useEffect(() => {
        let saved = JSON.parse(localStorage.getItem('cart'));
        setLengths(getLengthOfArray(fav, saved));
    }, [fav, itemsCart]);

    
    let navLinksMemoizeed = useMemo(() => navLinks === undefined || navLinks === null || navLinks === []
    ?
    null
    :
    navLinks.map(e => <NavLinkHeader key={e.id} title={e.title} link={e.link} currentPage={currentPage}/>), [navLinks, currentPage]);

    let iconsMemoizeed = useMemo(() => icons === undefined || icons === null || icons === []
    ?
    null
    :
    icons.map(e => <HeaderIcon key={e.id} favouriteLength={lengths.firstLength} cartLength={lengths.secondLength} link={e.link} alt={e.alt} image={e.image}/>), [icons, lengths])

    let valuteMemoizeed = useMemo(() => valuteArray && valuteArray.map(({id, valute}) => <ValuteSelect key={id} valute={valute}/>), [valuteArray])

    return (
        <>
        <div className="HeaderContent">
            <img src="https://i.ibb.co/hL66HBv/Group-1.png" alt="Menu"/>
            <ul className="NavLinks">
                {navLinksMemoizeed}
            </ul>
            <img src="https://i.ibb.co/km4vNVd/YANKI.png" alt="Logo"/>
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
        </div>
        {<NewCollection currentPage={currentPage}/>}
        </>
    )
})