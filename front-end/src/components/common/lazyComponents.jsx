import React from "react";

export const componentsMap = {
  adminPanel: React.lazy(() => import("../../pages/admin/adminPanel")),
  users: React.lazy(() => import("../../pages/admin/users")),
  userDetalis: React.lazy(() => import("../../pages/admin/userDetalis")),
  createHoroscop: React.lazy(() => import("../../pages/admin/createHoroscop")),
  homePage: React.lazy(() => import("../../pages/homePage")),
};

export function MarginalComponent({ name }) {
  const Component = componentsMap[name];

  if (!Component) return <div>Conponent not found.</div>;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
}
