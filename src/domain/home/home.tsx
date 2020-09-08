import React from 'react';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{height: '120vh', backgroundColor: '#606060'}}/>
      <Footer />
    </>
  );
};

export default Home;