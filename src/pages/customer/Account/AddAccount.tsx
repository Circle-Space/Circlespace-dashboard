import React, {
  useEffect,
  useState,
} from "react";

import {
  Card,
  Container,
  Nav,
  Tab,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import CommandBar from "../../../components/CommandBar";
import useAccountManagement from "../../../hooks/useAccount";
import useAuth from "../../../hooks/useAuth";
import AddAccountForm from "./AddAccountForm";

const AddAccount = () => {
  const { getAccount, account, loading } = useAccountManagement();
  const { getUserinfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [clearForm, setClearForm] = useState(false);

  useEffect(() => {
    getAccount();
    getUserinfo();
  }, []);

  const handleBack = async () => {
    console.log("here...");
    navigate(-1);
  };

  const handleClear = () => {
    setClearForm(true);
    // setTimeout(() => {
    //   setClearForm(false);
    // }, 2000);
  };

  return (
    <Card className="flex-fill w-200">
      <React.Fragment>
        <CommandBar
          handleSave={() => { }}
          handleSaveAndClose={() => { }}
          handleNew={() => { }}
          handleClear={handleClear}
          handleBack={handleBack}
        />
        <Helmet title="Add New Contact" />
      </React.Fragment>
      <Container fluid className="p-0">
        <div className="p-4">
          <Tab.Container defaultActiveKey={location.state || "AddAccounts"}>
            <Nav variant="tabs" style={{ marginTop: "10px" }}>
              <Nav.Item>
                <Nav.Link eventKey="AddAccounts">Summary</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="details">Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Scheduling">Scheduling</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="">Files</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="AddAccounts">
                <AddAccountForm clearForm={clearForm} />
              </Tab.Pane>
              <Tab.Pane eventKey="details"></Tab.Pane>
              <Tab.Pane eventKey="Scheduling"></Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </Container>
    </Card>
  );
};

export default AddAccount;
