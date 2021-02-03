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

LoginRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.string.isRequired,
  setAuth: PropTypes.bool.isRequired,
};
ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.string.isRequired,
  setAuth: PropTypes.bool.isRequired,
};
