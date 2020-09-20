import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

const About: React.FC = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{height: '90vh', backgroundColor: '#606060', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{fontSize: '32px', color: '#FFDD00', textTransform: 'uppercase'}}>Under Construction</p>
      </div>
      <Footer />
    </>
  );
};

export default About;