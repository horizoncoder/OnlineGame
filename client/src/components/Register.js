import React, { Fragment, useState,render } from "react";
import { Button,Form,Col,InputGroup } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import {API_URL} from  './api';
//const url= new URL('http://localhost:5000');
const Register =({ setAuth }) =>{
  const [validated, setValidated] = useState(false);

  const [inputs, setInputs] = useState({
    email: "dima6@gmail.com",
    password: "dima",
    name: "dima"
    
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        API_URL +"auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();


        if(parseRes.token){
          console.log(parseRes);
          localStorage.setItem("token",parseRes.token);

          setAuth(true);
          toast.success("Успешная регистрация")
        }else{
          setAuth(false)
          toast.error(parseRes)
        }
  
    } catch (err) {
      console.error(err.message);
    }
  };


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmitForm}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Почта</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="example@gmail.com"
            value={email}
            onChange={e => onChange(e)}
          />
          
         <Form.Control.Feedback type="invalid">
            Введите свою почту
          </Form.Control.Feedback>
        </Form.Group>
      
     
        
      </Form.Row>
      <Form.Row>
      
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Имя</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Имя" 
          value={name}
          onChange={e => onChange(e)}
          required />
          <Form.Control.Feedback type="invalid">
          Введите свое имя
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
      <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            onChange={e => onChange(e)}
            value={password}
          />
          <Form.Control.Feedback type="invalid">
            Введите свой пароль
          </Form.Control.Feedback>
        </Form.Group>
    </Form.Row>
      <Button type="submit">Submit form</Button>
      <Link to="/login">login</Link>
    </Form>
     
  );
}

export default Register