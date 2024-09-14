import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import customer_auth_img from "../../../Assets/customer_auth_img.png";
import GoogleAuth from "../../authentication/googleAuth";
import logo from "../../../Assets/logo.png";

export default function CustomerRegister() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isVerifying, setVerifying] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const divStyle = {
    backgroundImage: `url(${customer_auth_img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "50%",
    borderRadius: "0",
  };

  const signUp = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await sendEmailVerification(userCredential.user);
      setMsg("A verification email has been sent. Please check your inbox.");
      setVerifying(true);

      await setDoc(doc(db, "customers", userCredential.user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        type: "customer",
      });
      // console.log("email and password");
      // navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isVerifying) {
      const interval = setInterval(() => {
        auth.currentUser.reload().then(() => {
          if (auth.currentUser.emailVerified) {
            setVerifying(false);
            navigate("/login");
          }
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVerifying]);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("sign out");
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
              onSubmit={handleSubmit(signUp)}
            >
              <div className="d-flex justify-content-between w-100">
                <h1 className="text-start text-xl fw-bold">Sign Up</h1>
                <img
                  src={logo}
                  alt=""
                  width={"80px"}
                  height={"60px"}
                  className=""
                />
              </div>
              <p className="text-start mt-2 text-muted w-100">
                Create your new account in seconds
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              {msg && <Alert variant="primary">{msg}</Alert>}
              <Form.Group className="w-100 mb-3">
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="First Name"
                  className="text-muted fs-5"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                <div className="d-flex w-100 text-start text-danger">
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
              </Form.Group>
              <Form.Group className="w-100 mb-3">
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Last Name"
                  className="text-muted fs-5"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                <div className="d-flex w-100 text-start text-danger">
                  {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
              </Form.Group>
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
                  placeholder="Create Password"
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
              <div className="d-flex w-100 flex-column align-items-start justify-content-between mb-3">
                <Form.Group className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="termsAndCondition"
                    className="me-2"
                    {...register("termsAndCondition", {
                      required:
                        "You must agree to the terms and privacy policy",
                    })}
                  />
                  <Form.Label htmlFor="termsAndCondition" className="mb-0">
                    I agree to the terms and privacy policy
                  </Form.Label>
                </Form.Group>
                {errors.termsAndCondition && (
                  <div className="d-flex w-100 text-start text-danger mb-3">
                    <span>{errors.termsAndCondition.message}</span>
                  </div>
                )}
              </div>
              <Button
                className="w-100"
                type="submit"
                style={{ height: "45px",background:"#7754F6" }}
              >
                Create an Account
              </Button>
              <Link
                to="/signin"
                className="mt-3 text-muted text-decoration-none text-start w-100"
              >
                Already a member?{" "}
                <span
                  className=""
                  style={{ color: "#7754F6", textDecoration: "underline" }}
                >
                  Sign In
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
