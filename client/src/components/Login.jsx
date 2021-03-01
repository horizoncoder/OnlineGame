import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { API_URL } from "./api";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  const { register, handleSubmit, errors } = useForm();

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async () => {
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
      <Form onSubmit={handleSubmit(onSubmitForm)} className="centered-top">
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <br />
            <Form.Label>Почта</Form.Label>
            <Form.Control
              required
              name="email"
              value={email}
              placeholder="email"
              onChange={(e) => onChange(e)}
              ref={register({
                required: "Введите почту",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Неправильная почта",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChange(e)}
              value={password}
              ref={register({
                required: "Введите пароль",
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row />

        <Button type="submit">Логин</Button>
      </Form>
      <Link to="/register">Регистрация</Link>
    </>
  );
};
Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Login;
