import React from 'react';
import MetaHeader from './MetaHeader'; 
import PageHeader from './PageHeader';
import SideMenu from './SideMenu';
import Breadcrumb from './Breadcrumb';
import BodyHeader from './BodyHeader';
import commonStyles from "../styles/common-layout.module.css"

const Layout = ({ children, pageName }) => {
  return (
    <div>
      <MetaHeader title={pageName} />
      <PageHeader />
      <div className={commonStyles.body}>
        <SideMenu />
        <div className={commonStyles.main}>
          <Breadcrumb />
          <BodyHeader pageName={pageName} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
