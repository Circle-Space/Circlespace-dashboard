import { useContext } from "react";

import { FeatureContext } from "../contexts/FeaturesContext";

const useFeatures = () => {
    const context = useContext(FeatureContext);

    if (!context) {
        throw new Error("FeaturesContext must be placed within FeaturesManagementProvider");
    }

    return context;
};

export default useFeatures;
