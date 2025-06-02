import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";



const I18nContext = createContext();

export function I18nProvider({ children }) {

    const { t, i18n } = useTranslation();

    const changeMyLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <I18nContext.Provider value={{ t, i18n, changeMyLanguage }}>
            {children}
        </I18nContext.Provider>
    );


}


export function useI18n() {
   
    return useContext(I18nContext);
}

