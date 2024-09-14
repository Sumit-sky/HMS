import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import customer_auth_img from "../../../Assets/customer_auth_img.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuth from "../../authentication/googleAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";

const divStyle = {
  backgroundImage: `url(${customer_auth_img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "50%",
  borderRadius: "0",
};

export default function CustomerAuth() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginEmailAndPassword = async (data) => {
    setLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "customers", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        if (!user.emailVerified) {
          setError("Email not Verified, Please check your inbox");
        } else {
          console.log("sign in success");
        }
      }
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
              <div className="d-flex justify-content-between w-100">
                <h1 className="text-start text-xl fw-bold">Sign In</h1>
                <img
                  src={logo}
                  alt=""
                  width={"80px"}
                  height={"60px"}
                  className=""
                />
              </div>
              <p className="text-start mt-2 text-muted w-100">
                Sign in to your account in seconds
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
                <a href="#" className="" style={{ color:"#7754F6" }}>
                  Forgot Password?
                </a>
              </div>
              <Button
                className="w-100"
                type="submit"
                style={{ height: "45px",background:"#7754F6" }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Log in"}
              </Button>
              <Link
                to="/signup"
                className="mt-3 text-muted text-decoration-none text-start w-100"
              >
                Don't have an account?{" "}
                <span
                  className=""
                  style={{ color: "#7754F6", textDecoration: "underline" }}
                >
                  Sign Up
                </span>
              </Link>
            </Form>
            <GoogleAuth type={"customer"} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
