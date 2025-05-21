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
import { columns } from './components/categoriesTableColumns';
import BaseTable from '../../../components/BaseTable';
import useProductManagement from '../hooks/useProductManagement';
import { Category } from '../types/ProductManagementTypes';
import { PaginationType } from '../../../types/apiResponse';

const Categories = () => {
  const { 
    getCategories, 
    categories, 
    deleteCategory,
    getCategoriesBySearch,
    categoriesPagination
  } = useProductManagement()
  const navigate = useNavigate();
  const { setNavbarTitle } = useLayout();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [paginationKey, setPaginationKey] = useState("Get Categories");
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);

  const functionMap: {
    [key: string]: (paginationType: PaginationType) => void;
  } = {
    ['Search']: (type: PaginationType) => getCategoriesBySearch(type, ''),
    ['Get Categories']: (type: PaginationType) => getCategories(type),
  };

  useEffect(() => {
      setNavbarTitle("User Management");
      getCategories("RESET");
      setPaginationKey("Get Categories");
      return () => {
          setNavbarTitle("");
      };
  }, []);

  const handleBatchDelete = () => {
    deleteCategory(selectedCategories[0].Id)
    setShowDeleteModal(false)
  };

  const handleRowSelect = useCallback((selectedRows: Category[]) => {
      console.log("Selected Rows:", selectedRows);
      setSelectedCategories(selectedRows);
  }, []);

  const handleSearch = (query: string) => {
    if (typeof query === 'string' && query.trim().length > 0) {
      getCategoriesBySearch('RESET', query);
    }
  };

  return (
      <React.Fragment>
          <Helmet title="User Management" />
          <CommandBar
              handleNew={() => {
                  navigate("create");
              }}
              buttons={[]}
              handleBack={() => { }}
              handleDelete={selectedCategories.length === 1 ? () => {
                  setShowDeleteModal(true)
              } : undefined}
              handleEdit={
                  selectedCategories.length === 1
                      ? () => {
                          navigate(`update/${selectedCategories[0].Id}`)
                      }
                      : undefined
              }
              searchOptions={{
                handleSearch: (searchVal: string) => {
                  handleSearch(searchVal);
                  setPaginationKey('Search');
                },
                handleClearSearch: () => {
                  getCategories('RESET');
                  setPaginationKey('Get Categories');
                },
                searchPlaceholder: 'Search Contact...',
              }}
          />
      
          <Container className="p-3">
            <h1 className="dashboard-header-text mb-2">Manage Categories</h1>
            <p className="sub-header">
             some description
            </p>
            <div className="analytics-command-bar p-2">
              <BaseTable
                data={categories || []}
                columns={columns} // Use the columns specific to Users
                onRowSelect={handleRowSelect}
                showBorder={false}
                showStriped={false}
                showHover={false}
                showPagination={true}
                pagePagination={categoriesPagination}
                setPagination={functionMap[paginationKey]}
              />
            </div>
          </Container>
          <ModalBase
              size="sm"
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              title="Delete Users"
              onCancel={() => setShowDeleteModal(false)}
              onSubmit={handleBatchDelete}
              primaryButtonText="Delete"
              secondaryButtonText="cancel"
          >
              <p>Are you sure you want to delete the selected categories?</p>
          </ModalBase>
      </React.Fragment>

  );
};

export default Categories;
