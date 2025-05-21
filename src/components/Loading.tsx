import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}
const Loading = ({ loading, children }: Props) => {
  return loading ? (
    <Container fluid className="vh-50 d-flex">
      <Row className="justify-content-center align-self-center w-100 text-center">
        <Spinner animation="border" variant="primary" />
      </Row>
    </Container>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default Loading;
