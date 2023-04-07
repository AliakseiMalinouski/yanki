import React, { useMemo } from "react";
import { OrderForm } from "./OrderForm";
import { useTranslation } from "react-i18next";

export const Order = React.memo(() => {

    const {t} = useTranslation();

    let orderFormMemoizeed = useMemo(() => <OrderForm setLanguage={t}/>, [t])

    return (
        <div className="Order">
            {orderFormMemoizeed}
        </div>
    )
})