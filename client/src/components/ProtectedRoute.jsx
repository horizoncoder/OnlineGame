import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export function LoginRoute(props) {
  const { isAuthenticated } = props;
  const { component } = props;
  if (!isAuthenticated) {
    const Component = component;
    return <Component {...{ props }} setAuth={props.setAuth} />;
  }
  return <Redirect to="/dashboard" />;
}

export function ProtectedRoute(props) {
  const { isAuthenticated } = props;
  const { component } = props;
  if (isAuthenticated) {
    const Component = component;
    return <Component {...{ props }} setAuth={props.setAuth} />;
  }
  return <Redirect to="/login" />;
}

const defaultProps = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};

LoginRoute.propTypes = defaultProps;

ProtectedRoute.propTypes = defaultProps;
