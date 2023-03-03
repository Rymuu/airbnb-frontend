import React from 'react';
import AdminHeader from "../components/AdminHeader";

const Index = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div>
        {children}
      </div>
    </>
  );
}

export default Index;