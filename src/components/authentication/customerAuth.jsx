import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Form, Button, Alert } from "react-bootstrap";
import customer_auth_img from "../../Assets/customer_auth_img.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default function CustomerAuth() {
  const divStyle = {
    backgroundImage: `url(${customer_auth_img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "50%",
    borderRadius: "0",
  };

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginEmailAndPassword = async (data) => {
    const auth = getAuth();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("sign in success");
      // console.log(user.email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <div style={divStyle} className="d-none d-md-block"></div>
      <div className="col d-flex justify-content-center align-items-center p-3">
        <Card className="border-0 w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <Form
              className="d-flex flex-column align-items-center"
              onSubmit={handleSubmit(loginEmailAndPassword)}
            >
              <h1 className="text-start text-xl fw-bold w-100">Login</h1>
              <p className="text-start mt-2 text-muted w-100">
                Login to your account in seconds
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group className="w-100 mb-3">
                <Form.Control
                  type="email"
                  size="lg"
                  placeholder="Email"
                  className="text-muted fs-5"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid Email",
                    },
                  })}
                />
                <div className="d-flex w-100 text-start text-danger">
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
              </Form.Group>
              <Form.Group className="w-100 mb-3">
                <Form.Control
                  type="password"
                  size="lg"
                  placeholder="Password"
                  className="text-muted fs-5"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <div className="d-flex w-100 text-start text-danger">
                  {errors.password && <span>{errors.password.message}</span>}
                </div>
              </Form.Group>
              <div className="d-flex w-100 align-items-center justify-content-between mb-3">
                <Form.Group className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="keepMeSignedIn"
                    className="me-2"
                  />
                  <Form.Label htmlFor="keepMeSignedIn" className="mb-0">
                    Remember Me
                  </Form.Label>
                </Form.Group>
                <a href="#" className="text-primary">
                  Forgot Password?
                </a>
              </div>
              <Button
                variant="primary"
                className="w-100"
                type="submit"
                style={{ height: "45px" }}
              >
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
