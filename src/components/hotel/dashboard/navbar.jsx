import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../../../Assets/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HotelNavbar() {
  return (
    <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            width="60"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Form>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            {/* <Col xs="auto">
              <Button type="submit">Submit</Button>
            </Col> */}
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}
