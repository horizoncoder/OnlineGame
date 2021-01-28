import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Col } from 'react-bootstrap';
import {API_URL} from  './api';


const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  
    
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        API_URL + "auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      const parseRes = await response.json();


     if (parseRes.token){
          console.log(parseRes);
          localStorage.setItem("token", parseRes.token);

          setAuth(true);
          toast.success("Успешная регистрация")
        } else {
          setAuth(false)
          toast.error(parseRes)
        }
    } catch (err) {
      console.error(err.message);
    }
  };
  const [validated, setValidated] = useState(false);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={ onSubmitForm }>
      <Form.Row>
        
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <br></br>
          <Form.Label>Почта</Form.Label>
          <Form.Control
            required
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          />
          <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Введите почту 
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
            value={password}
            placeholder="password"
            onChange={e => onChange(e)}
          />
          <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Введите пароль
            </Form.Control.Feedback>
          
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
          onChange={e => onChange(e)}
          />
           <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Введите имя
            </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
     
      <Button type="submit">Регистрация</Button>
    </Form>
      <Link to="/login">Логин</Link>
    </>
  );
};

export default Register;
