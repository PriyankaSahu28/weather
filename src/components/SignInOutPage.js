import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const SignInOutPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/signin", { email, password });
      console.log(response.data);
      setEmail("");
      setPassword("");
      setAuthenticated(true);
      alert("You are now signed in.");
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.get("/signout");
      console.log(response.data);
      setAuthenticated(false);
      alert("You are now signed out.");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing out.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardHeader className="bg-primary text-white">
              {/* <h4 className="mb-0">Sign In/Sign Out</h4> */}
            </CardHeader>
            <CardBody>
              {authenticated ? (
                <Button color="secondary" onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Form onSubmit={handleSignIn}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Sign In
                  </Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInOutPage;
