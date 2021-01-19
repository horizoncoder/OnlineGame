import React, { Fragment,} from "react";
import { Form ,Button} from 'react-bootstrap';
export const Login= ()=>(
    <Form>
        <h1 className="mt-5 text-center">Login</h1>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">

  </Form.Group>
  
  <Button variant="primary" type="submit">
   Login
  </Button>{' '}

  <Button variant="danger" type="submit" >
    Register
  </Button>
  
 
</Form>
)


