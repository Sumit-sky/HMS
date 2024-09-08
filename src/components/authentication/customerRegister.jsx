import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import customer_auth_img from "../../Assets/customer_auth_img.png";

export default function CustomerRegister() {
  const [error, setError] = useState("");
  // const navigate = useNavigate();/
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
      await setDoc(doc(db, "customers", userCredential.user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        type: "customer",
      });
      console.log("email and password");
      //   navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const googleSignUp = async (data) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      // Check if the user document already exists
      const userDocRef = doc(db, "customers", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        // Only create a new document if it doesn't already exist
        await setDoc(userDocRef, {
          firstName: user.displayName ? user.displayName.split(" ")[0] : "",
          lastName: user.displayName
            ? user.displayName.split(" ").slice(1).join(" ")
            : "",
          email: user.email,
          photoURL: user.photoURL,
          type: "customer",
        });
      }
      console.log("with google");
    } catch (error) {
      setError(error.message);
    }
  };

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
              <h1 className="text-start text-xl fw-bold w-100">Sign Up</h1>
              <p className="text-start mt-2 text-muted w-100">
                Create your new account in seconds
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
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
                variant="primary"
                className="w-100"
                type="submit"
                style={{ height: "45px" }}
              >
                Create an Account
              </Button>
              <Link
                to="/login"
                className="mt-3 text-muted text-decoration-none text-start w-100"
              >
                Already a member?{" "}
                <span
                  className=""
                  style={{ color: "#7754F6", textDecoration: "underline" }}
                >
                  Login
                </span>
              </Link>
            </Form>
            <div className="mt-4 text-muted">
              <p>Or continue with</p>
              <Button variant="none" onClick={googleSignUp}>
                <img
                  width={"50px"}
                  src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                  alt="Google Login"
                />
              </Button>
              <Button onClick={logout}>Logout</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
