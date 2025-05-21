import React, {
    useEffect,
    useState,
} from "react";

import {
    Card,
    Col,
    Container,
    Row,
    Tab,
    Tabs,
} from "react-bootstrap";

import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import useLayout from "../../hooks/useLayout";
import useUsers from "../../hooks/useUsers";
import Password from "./Password";
import ProfileDetail from "./ProfileDetail";
import ThemeSettings from "./ThemeSettings";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const { getUsers, loading } = useUsers();
    const { setNavbarTitle } = useLayout();
    const { user, getUserinfo } = useAuth();

    useEffect(() => {
        setNavbarTitle("My Profile");
        getUsers("RESET");
        getUserinfo();

        return () => {
            setNavbarTitle("");
        }
    }, []);



    const handleTabSelect = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <Loading loading={loading}>
            <Container fluid className="p-4">
                <Row>
                    <Col md={3}>
                        <Card className="mb-2">
                            <Tabs
                                activeKey={activeTab}
                                onSelect={handleTabSelect}
                                id="profile-tabs"
                                fill
                                variant="pills"
                                className="flex-column"
                            >
                                <Tab eventKey="profile" title="Settings" />
                                <Tab eventKey="password" title="Password" />
                                <Tab eventKey="theme" title="Theme" />
                            </Tabs>
                        </Card>
                    </Col>
                    <Col md={9}>
                        {activeTab === "profile" && (
                            <ProfileDetail user={user} />
                        )}
                        {activeTab === "password" && (
                            <Password />  
                        )}
                        {activeTab === "theme" && (
                            <ThemeSettings/>
                        )}
                    </Col>
                </Row>
            </Container>
        </Loading>
    );
};

export default ProfilePage;
