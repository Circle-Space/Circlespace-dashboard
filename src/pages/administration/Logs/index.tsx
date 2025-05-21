import React, {useEffect} from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import CommandBar from "../../../components/CommandBar";
import LogsTable from "./LogsTable";
import useLayout from "../../../hooks/useLayout";

const LogsLanding = () => {
  const { setNavbarTitle } = useLayout();
  
    useEffect(() => {
      setNavbarTitle("Logs");

      return () => {
          setNavbarTitle("");
      }
    }, []);



  return (
    <React.Fragment>
      <CommandBar
        handleSave={() => {}}
        handleSaveAndClose={() => {}}
        handleNew={() => {}}
        buttons={[]}
        handleClear={() => {}}
        handleBack={() => {}}
      />
      <Helmet title="Logs" />
      <Container fluid className="p-4 full-height">
        <LogsTable />
      </Container>
    </React.Fragment>
  );
};

export default LogsLanding;
