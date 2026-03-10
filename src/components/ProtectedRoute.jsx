import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, userProfile, children }) {

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userProfile === null || userProfile === undefined) {
    return null;
  }

  if (!userProfile.hasCompletedSetup) {
    return <Navigate to="/avatar-creator" replace />;
  }

  return children;

}
