import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

import BaseTable from "../../../components/BaseTable";
import LoadingOverlay from "../../../components/LoadingOverlay";
import useFeatureManagement
  from "../../../hooks/useFeatures"; // Adjust the import to match your file structure
import useLayout from "../../../hooks/useLayout";
import { PaginationType } from "../../../types/apiResponse";
import {
  Feature,
} from "../../features/types/featuresTypes"; // Adjust the import to match your file structure
import {
  columns,
} from "./tableColumns"; // Adjust the import to match your file structure

const FeatureManagement = () => {
  const {
    getFeatures,
    searchFeatures,
    clearFeatures,
    features,
    featurePagination,
  } = useFeatureManagement(); // Adjust the hook name to match your file structure
  const { setNavbarTitle } = useLayout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

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
    if (Array.isArray(features) && features.length > 0) {
      setLoading(false);
    }
  }, [features]);

  const handleRowSelect = useCallback((selectedRows: Feature[]) => {
    console.log("Selected Rows:", selectedRows);
    setSelectedFeatures(selectedRows);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Feature Management" />
      <Container fluid className="p-0">
        <div className="current-loading-wrapper">
          <LoadingOverlay loading={loading} />
          <div style={{ marginTop: -4 }} className="analytics-command-bar p-2">
            <BaseTable
              data={features}
              columns={columns} // Adjust the import to match your file structure
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
    </React.Fragment>
  );
};

export default FeatureManagement;
