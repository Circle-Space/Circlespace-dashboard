import { PaginationInfo, PaginationType } from '../../../types/apiResponse';
import { Category, Product } from './ProductManagementTypes';

export type ProductManagementState = {
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;
  error: string;
  productsPagination: PaginationInfo;
  categoriesPagination: PaginationInfo;
};

export type ProductManagementContextType = ProductManagementState & {
  getProducts: (paginationType: PaginationType, callback?: () => void) => void;
  getProductById: (id: string, callback?: () => void) => void;
  getProductsBySearch: (paginationType: PaginationType, searchVal: string, callback?: () => void) => void;
  addProduct: (product: Product, callback?: () => void) => void;
  updateProduct: (product: Product, callback?: () => void) => void;
  deleteProduct: (id: string, callback?: () => void) => void;
  getCategories: (paginationType: PaginationType, callback?: () => void) => void;
  getCategoriesBySearch: (paginationType: PaginationType, searchVal: string, callback?: () => void) => void;
  getCategoryById: (id: string, callback?: () => void) => void;
  addCategory: (category: Category, onSuccess?: () => void) => void;
  updateCategory: (category: Category, onSuccess?: () => void) => void;
  deleteCategory: (id: string, callback?: () => void) => void;
  clear: () => void;
};

export type ProductManagementAction =
  | {
      type: 'GET_PRODUCTS';
      payload: {
        products: Product[];
        productPagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_PRODUCT_BY_ID';
      payload: {
        product: Product;
      };
    }
  | {
      type: 'DELETE_PRODUCT';
      payload: {
        id: string;
      };
    }
  | {
      type: 'GET_CATEGORIES';
      payload: {
        categories: Category[];
        categoriesPagination: PaginationInfo;
      };
    }
  | {
      type: 'GET_CATEGORY_BY_ID';
      payload: {
        category: Category;
      };
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'CLEAR';
    }
  | {
      type: 'DELETE_CATEGORY';
      payload: {
        id: string;
      };
    };
