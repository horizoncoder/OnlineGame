import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL } from "./api";

// eslint-disable-next-line react/prop-types
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    emaile: "",
    passworde: "",
  });

  const { email, password, emaile, passworde } = inputs;
 
  const blurHandler = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "email":
        if (inputs.email.length > 30 || inputs.email.length < 12) {
          inputs.emaile =
            "Почта должна иметь не больше 30 символов и не меньше 14";
        }
        break;
      case "password":
        if (inputs.password.length > 20 || inputs.password.length < 3) {
          inputs.passworde =
            "Пароль должна иметь не больше 20 символов и не меньше 3";
        }

        break;
    }
  };

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  const [validated, setValidated] = useState(false);

  const onSubmitForm = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }

    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Успешная авторизация");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={onSubmitForm}
        className="centered-top"
      >
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <br />
            <Form.Label>Почта</Form.Label>
            <Form.Control
              required
              name="email"
              value={email}
              placeholder="email"
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => onChange(e)}
            />
            {emaile}
            <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Введите правильну почту (mail@gmail.com)
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              onBlur={(e) => blurHandler(e)}
              value={password}
              placeholder="password"
              onChange={(e) => onChange(e)}
            />
            {passworde}
            <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Введите пароль
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row />

        <Button type="submit">Логин</Button>
      </Form>
      <Link to="/register">Регистрация</Link>
    </>
  );
};

export default Login;
