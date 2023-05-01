import React from "react";
import {yankiEvents} from '../events';
import { useTranslation } from "react-i18next";
import {motion} from 'framer-motion';

const animateCategory = {
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: custom * 0.1
        }
    }),
    hidden: {
        y: 300,
        opacity: 0,
    }
}


export const Category = React.memo(({translateKey, index, image, id}) => {

    const {t} = useTranslation();

    const styles = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    const parentCalledToGoToDetailsCategory = () => {
        yankiEvents.emit('goToDetailsCategory', translateKey);
    }

    return (
        <motion.div className="Category" style={styles} onClick={parentCalledToGoToDetailsCategory}
        initial={'hidden'}
        whileInView={'visible'}
        viewport={{once: true}}
        custom={index}
        variants={animateCategory}
        >
            <div className="CategoryName">
                {t(`${translateKey}`)}
            </div>
        </motion.div>
    )
})