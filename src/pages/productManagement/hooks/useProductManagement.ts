import { useContext } from "react";
import { ProductManagementContext } from "../context/ProductManagementContext";

const useProductManagement = () => {
    const context = useContext(ProductManagementContext);

    if (!context) {
        throw new Error("ProductManagementContext must be placed within ProductManagementProvider");
    }

    return context;
};

export default useProductManagement;
