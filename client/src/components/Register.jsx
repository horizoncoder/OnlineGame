import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { API_URL } from "./api";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;
  const { register, handleSubmit, errors } = useForm();

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async () => {
    try {
      const body = { email, password, name };
      const response = await fetch(`${API_URL}auth/register`, {
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
        toast.success("Успешная регистрация");
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
      <Form onSubmit={handleSubmit(onSubmitForm)}>
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
                minLength: {
                  value: 5,
                  message: "Почта должна быть не меньше 5 символов",
                },
                maxLength: {
                  value: 30,
                  message: "Почта должна быть не больше 30 символов",
                },
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
                minLength: { value: 8, message: "Короткий пароль" },
                maxLength: { value: 20, message: "Длинный пароль" },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              placeholder="name"
              onChange={(e) => onChange(e)}
              ref={register({
                required: "Введите имя",
                minLength: { value: 2, message: "Короткое имя" },
                maxLength: { value: 12, message: "Длинное имя" },
              })}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </Form.Group>
        </Form.Row>

        <Button type="submit">Регистрация</Button>
      </Form>
      <Link to="/login">Логин</Link>
    </>
  );
};
Register.propTypes = {
  setAuth: PropTypes.func.isRequired,
};
export default Register;
