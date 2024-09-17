import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../Assets/logo.png";
import InputGroup from "react-bootstrap/InputGroup";

export default function HotelNavbar() {
  return (
    <Navbar expand="md">
      <Container className="mx-md-5 flex-nowrap">
        <Navbar.Brand>
          <Image
            src={logo}
            width="60"
            height="50"
            className="d-inline-block align-top"
            alt="StayPedia Logo"
            rounded
          />
        </Navbar.Brand>
        <Row className="justify-content-between align-items-center col-md-10 m-0 h-auto">
          <Col xs="auto" md="8" lg="6">
            <Form>
              <Form.Group as={Row} className="mb-0">
                <Col>
                  <InputGroup className="border rounded">
                    <InputGroup.Text id="" className="border-0 bg-transparent">
                      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search for rooms and offers"
                      className="border-0"
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col xs="auto">
            <Navbar.Collapse>
              <Row>
                <Col xs="auto">
                  <FontAwesomeIcon icon={faBell} size="lg" />
                </Col>
                <Col xs="auto">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Col>
              </Row>
            </Navbar.Collapse>
          </Col>
        </Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}
