import React, { Fragment, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const Forms = ({ setAuth }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('почта не может быть пустой');
  const [passwordError, setPasswordError] = useState(
    'пароль не может быть пустой'
  );

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Неправильная почта');
    } else {
      setEmailError();
    }
  };

  const PasswordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.lenght < 3 || e.target.value.lenght > 8) {
      setPasswordError('ddd');
      if (!e.target.value) {
        setPasswordError('ddd');
      }
    } else {
      setPasswordError();
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <Fragment>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => emailHandler(e)}
            onBlur={(e) => blurHandler(e)}
            value={email}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          {emailDirty && emailError && (
            <div style={{ color: 'red' }}>{emailError}</div>
          )}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => PasswordHandler(e)}
            onBlur={(e) => blurHandler(e)}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
          />
          {passwordDirty && passwordError && (
            <div style={{ color: 'red' }}>{passwordError}</div>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default Forms;
