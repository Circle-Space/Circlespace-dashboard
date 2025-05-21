import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';

import BaseTable from '../../components/BaseTable';
import CommandBar from '../../components/CommandBar';
import LoadingOverlay from '../../components/LoadingOverlay';
import ModalBase from '../../components/ModalBase';
import useFeature from '../../hooks/useFeatures';
import useLayout from '../../hooks/useLayout';
import { PaginationType } from '../../types/apiResponse';
import { columns } from './components/tableColumns';
import { Feature } from './types/featuresTypes';

const FeaturesPage = () => {

    const {
        getFeatures,
        searchFeatures,
        clearFeatures,
        features,
        featurePagination,
        deleteFeature
    } = useFeature();

    const { setNavbarTitle } = useLayout();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [paginationKey, setPaginationKey] = useState("Get Features");
    const functionMap: {
        [key: string]: (paginationType: PaginationType) => void;
    } = {
        ["Search"]: (type: PaginationType) => searchFeatures(type, ""),
        ["Get Features"]: (type: PaginationType) => getFeatures(type),
    };

    useEffect(() => {
        setNavbarTitle("Feature Management");
        getFeatures("RESET");
        setPaginationKey("Get Features");
        return () => {
            setNavbarTitle("");
            clearFeatures();
        };
    }, []);

    useEffect(() => {
        if (Array.isArray(features) && features.length >= 0) {
            setLoading(false);
        }
    }, [features]);

    const handleDeleteFeature = async () => {
        await deleteFeature(selectedFeatures[0]);
        setShowDeleteModal(false);
        getFeatures("RESET");
    };

    const handleSearch = (query: string) => {
        console.log("query " + query);
        if (typeof query === "string" && query.trim().length > 0) {
            searchFeatures("RESET", query);
        }
    };

    const handleRowSelect = useCallback((selectedRows: Feature[]) => {
        console.log("Selected Rows:", selectedRows);
        setSelectedFeatures(selectedRows);
    }, []);



    return (
        <React.Fragment>
            <Helmet title="User Management" />
            <CommandBar
                handleNew={() => {
                    navigate("add");
                }}
                buttons={[]}
                handleBack={() => { }}
                handleDelete={selectedFeatures.length === 1 ? () => {
                    setShowDeleteModal(true)
                } : undefined}
                handleEdit={
                    selectedFeatures.length === 1
                        ? () => {
                            navigate(`${selectedFeatures[0].Id}`)
                        }
                        : undefined
                }
                searchOptions={{
                    handleSearch: (searchVal: string) => {
                        handleSearch(searchVal);
                        setPaginationKey("Search");
                    },
                    handleClearSearch: () => {
                        getFeatures("RESET");
                        setPaginationKey("Get Users");
                    },
                    searchPlaceholder: "Search User...",
                }}
            />

            <Container fluid className="p-0">
                <div className="current-loading-wrapper">
                    <LoadingOverlay loading={loading} />
                    <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
                        <BaseTable
                            data={features}
                            columns={columns}
                            onRowSelect={handleRowSelect}
                            showBorder={false}
                            showStriped={false}
                            showHover={false}
                            showPagination={true}
                            pagePagination={featurePagination}
                            setPagination={functionMap[paginationKey]}
                        />
                    </div>
                </div>
            </Container>
            <ModalBase
                size="sm"
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                title="Delete Features"
                onCancel={() => setShowDeleteModal(false)}
                onSubmit={handleDeleteFeature}
                primaryButtonText="Delete"
                secondaryButtonText="cancel"
            >
                <p>Are you sure you want to delete the selected features?</p>
            </ModalBase>
        </React.Fragment>

    );
};

export default FeaturesPage;
