import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CommandBar from '../../../components/CommandBar';
import ModalBase from '../../../components/ModalBase';
import useLayout from '../../../hooks/useLayout';
import { columns } from './components/productTableColumns';
import BaseTable from '../../../components/BaseTable';
import useProductManagement from '../hooks/useProductManagement';
import { Product } from '../types/ProductManagementTypes';
import { Column } from 'react-table';
import { PaginationType } from '../../../types/apiResponse';

const Products = () => {
  const { 
    getProducts, 
    getProductsBySearch,
    getCategories, 
    products, 
    categories, 
    deleteProduct,
    productsPagination
} = useProductManagement()
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);

  const [paginationKey, setPaginationKey] = useState('Get Products');
  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => getProductsBySearch(type, ''),
    ['Get Products']: (type: PaginationType) => getProducts(type),
  };

  useEffect(() => {
      setNavbarTitle("User Management");
      getProducts("RESET");
      getCategories("RESET");
      setPaginationKey("Get Products");
      return () => {
          setNavbarTitle("");
      };
  }, []);

  const handleBatchDelete = () => {
      console.log("Batch Deleting users:", selectedProducts);
      // Implement batch delete logic
  };

  const handleRowSelect = useCallback((selectedRows: Product[]) => {
      setSelectedProducts(selectedRows);
  }, []);

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      getProductsBySearch('RESET', query);
    }
  };

  const productColumns: Column<Product>[] = [
        ...columns,
        {
            Header: "Category",
            accessor: (row) => categories.find(c => c.Id === row.CategoryId)?.Name || "",
        },
        {
            Header: "Parent Product",
            accessor: (row) => products.find(p => p.Id === row.ParentProductId)?.Name || "",
        },
  ]

  return (
      <React.Fragment>
          <Helmet title="User Management" />
          <CommandBar
              handleNew={() => {
                  navigate("create");
              }}
              buttons={[]}
              handleBack={() => { }}
              handleDelete={selectedProducts.length === 1 ? () => {
                  setShowDeleteModal(true)
              } : undefined}
              handleEdit={
                  selectedProducts.length === 1
                      ? () => {
                          navigate(`update/${selectedProducts[0].Id}`)
                      }
                      : undefined
              }
              searchOptions={{
                  handleSearch: (searchVal: string) => {
                      handleSearch(searchVal);
                      setPaginationKey("Search");
                  },
                  handleClearSearch: () => {
                      getProducts("RESET");
                      setPaginationKey("Get Products");
                  },
                  searchPlaceholder: "Search Product...",
              }}
          />
          
          <Container className="p-3">
            <h1 className="dashboard-header-text mb-2">Products</h1>
            <p className="sub-header">
                some description
            </p>
            <div className="current-loading-wrapper">
              <div  className="analytics-command-bar p-2">
                <BaseTable
                  data={products || []}
                  columns={productColumns} // Use the columns specific to Users
                  onRowSelect={handleRowSelect}
                  showBorder={false}
                  showStriped={false}
                  showHover={false}
                  showPagination={true}
                  pagePagination={productsPagination}
                  setPagination={functionMap[paginationKey]}
                />
              </div>
            </div>
          </Container>
          <ModalBase
              size="sm"
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              title="Delete Product"
              onCancel={() => setShowDeleteModal(false)}
              onSubmit={() => {
                deleteProduct(selectedProducts[0].Id)
                setShowDeleteModal(false)
              }}
              primaryButtonText="Delete"
              secondaryButtonText="cancel"
          >
              <p>Are you sure you want to delete the selected products?</p>
          </ModalBase>
      </React.Fragment>

  );
};

export default Products;
