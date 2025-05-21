import { useContext } from "react";
import { StaticValueContext } from "../contexts/StaticValuesContext";

const useStaticValue = () => {
    const context = useContext(StaticValueContext);

    if (!context) {
        throw new Error("StaticValueContext must be placed within StaticValueProvider");
    }

    return context;
};

export default useStaticValue;
