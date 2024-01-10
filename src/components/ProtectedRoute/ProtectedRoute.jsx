import { Navigate } from 'react-router-dom'
import React from "react";

export default function ProtectedRoute({
  component: Component,
  loggedIn,
  ...props
}) {
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={'/'} replace />
  )
}
