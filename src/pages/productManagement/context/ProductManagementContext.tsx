import {
    createContext,
    ReactNode,
    useReducer,
} from 'react';

import useToast from '../../../hooks/useToast';

import {
    APIResponse,
    initialPaginationSettings,
    PaginationInfo,
    PaginationType,
} from '../../../types/apiResponse';
import { apiClient } from '../../../utils/axios';
import { ProductManagementAction, ProductManagementContextType, ProductManagementState } from '../types/ProductManagementContext';
import { Category, Product } from '../types/ProductManagementTypes';
import { getConversationsQueryParam } from '../../../utils/pagination';

export const ProductManagementContext = createContext<ProductManagementContextType | null>(null);

const initialState: ProductManagementState = {
    products: [],
    product: {} as Product,
    categories: [],
    error: "",
    category: {} as Category,
    productsPagination: initialPaginationSettings,
    categoriesPagination: initialPaginationSettings
};

const ProductManagementReducer = (
    state: ProductManagementState, action: ProductManagementAction
): ProductManagementState => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload.products,
                productsPagination: action.payload.productPagination
            };
        case "GET_PRODUCT_BY_ID":
            return {
                ...state,
                product: action.payload.product
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(p => p.Id !== action.payload.id)
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload.categories,
                categoriesPagination: action.payload.categoriesPagination
            }
        case "GET_CATEGORY_BY_ID":
            return {
                ...state,
                category: action.payload.category
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(c => c.Id !== action.payload.id)
            }
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
};

function ProductManagementProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(ProductManagementReducer, initialState);
    const { showSuccessToast, showErrorToast } = useToast();

    const getProducts = async (
        paginationType: PaginationType,
        callback?: () => void
    ) => {
        try {
            const queryParam = getConversationsQueryParam(state.productsPagination, paginationType);
            const resp = await apiClient.get<APIResponse<Product[]>>(
                `/Products/?${queryParam}`
            );

            const { document, Pagination } = resp;
            dispatch({
                type: "GET_PRODUCTS",
                payload: {
                    products: document || [],
                    productPagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while fetching accounts", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getProductById = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Product>>(`/Products/${id}`)
            dispatch({ type: "GET_PRODUCT_BY_ID", payload: { product: resp.document } })
        } catch (e) {
            showErrorToast("Error while getting contact")
        } finally {
            if (callback) {
                callback()
            }
        }
    }

    const getProductsBySearch = async (paginationType: PaginationType, searchVal: string, callback?: () => void) => {
        try {
            const queryParam = getConversationsQueryParam(state.productsPagination, paginationType);
            const resp = await apiClient.get<APIResponse<Product[]>>(
                `/Products/search?searchKey=${searchVal}&${queryParam}`
            );

            const { document, Pagination } = resp;
            dispatch({
                type: "GET_PRODUCTS",
                payload: {
                    products: document || [],
                    productPagination: Pagination || initialPaginationSettings,
                },
            });
        } catch (e) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while fetching accounts", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    }

    const addProduct = async (product: Product, callback?: () => void) => {
        try {
            const resp = await apiClient.post<any>('/Products', product);
            showSuccessToast("New Product Successfully Added")
        } catch (e) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while fetching accounts", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    }

    const updateProduct = async (product: Product, callback?: () => void) => {
        try {
            const resp = await apiClient.put<any>(`/Products/${product.Id}`, product);
            showSuccessToast("Product Successfully Updated")
        } catch (e) {
            showErrorToast("Error while updating product");
            console.log("An error occurred while updating product", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    }

    const deleteProduct = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.delete<any>(`/Products/${id}`);
            showSuccessToast("Product(s) Successfully deleted")
            dispatch({ type: "DELETE_PRODUCT", payload: { id } })
        } catch (e) {
            showErrorToast("Error while deleting product");
            console.log("An error occurred while deleting product", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    }

    const getCategories = async (
        paginationType: PaginationType,
        callback?: () => void
    ) => {
        try {
            const queryParam = getConversationsQueryParam(state.productsPagination, paginationType);
            const resp = await apiClient.get<APIResponse<Category[]>>(
                `/Productcategories/?${queryParam}`
            );

            const { document, Pagination } = resp;
            dispatch({
                type: "GET_CATEGORIES",
                payload: {
                    categories: document,
                    categoriesPagination: Pagination || initialPaginationSettings
                },
            });
        } catch (e) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while fetching accounts", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const getCategoryById = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.get<APIResponse<Category>>(`/Productcategories/${id}`)
            dispatch({ type: "GET_CATEGORY_BY_ID", payload: { category: resp.document } })
        } catch (e) {
            showErrorToast("Error while getting category")
        } finally {
            if (callback) {
                callback()
            }
        }
    }

    const getCategoriesBySearch = async (
        paginationType: PaginationType,
        searchVal: string,
        callback?: () => void
    ) => {
        try {
            const queryParam = getConversationsQueryParam(state.productsPagination, paginationType);
            const resp = await apiClient.get<APIResponse<Category[]>>(
                `/Productcategories/search/?searchKey=${searchVal}&${queryParam}`
            );

            const { document, Pagination } = resp;
            dispatch({
                type: "GET_CATEGORIES",
                payload: {
                    categories: document,
                    categoriesPagination: Pagination || initialPaginationSettings
                },
            });
        } catch (e) {
            showErrorToast("Error while getting accounts");
            console.log("An error occurred while fetching accounts", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    };

    const addCategory = async (category: Category, onSuccess?: () => void) => {
        try {
            // const resp = await apiClient.get<APIResponse<Product[]>>(
            //     `/Products/?${queryParam}`
            // );
            // using any for now because document has a "records" object
            const resp = await apiClient.post<APIResponse<Category>>(`/Productcategories`, category);
            dispatch({
                type: "GET_CATEGORY_BY_ID",
                payload: {
                    category: resp.document,
                },
            });
            showSuccessToast("New Category Successfully Added")
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding category";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast("Error while adding category");
            console.log("An error occurred while adding category", error);
        }
    };

    const updateCategory = async (category: Category, onSuccess?: () => void) => {
        try {
            const resp = await apiClient.put<any>(`/Productcategories/${category.Id}`, category);
            showSuccessToast("Category Successfully Updated")
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error while adding category";
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            showErrorToast('Error while updating category');
            console.error('An error occurred while updating category', error);
        }

    }

    const deleteCategory = async (id: string, callback?: () => void) => {
        try {
            const resp = await apiClient.delete<any>(`/Productcategories/${id}`);
            showSuccessToast("Category Successfully deleted")
            dispatch({ type: "DELETE_CATEGORY", payload: { id } })
        } catch (e) {
            showErrorToast("Error while deleting category");
            console.log("An error occurred while deleting category", e);
        } finally {
            if (callback) {
                callback();
            }
        }
    }

    const clear = () => {
        dispatch({ type: 'CLEAR' });
    };

    return (
        <ProductManagementContext.Provider
            value={{
                ...state,
                getProducts,
                getProductById,
                getProductsBySearch,
                addProduct,
                updateProduct,
                deleteProduct,
                getCategories,
                getCategoryById,
                getCategoriesBySearch,
                addCategory,
                updateCategory,
                deleteCategory,
                clear
            }}
        >
            {children}
        </ProductManagementContext.Provider>
    );
}

export default ProductManagementProvider;
