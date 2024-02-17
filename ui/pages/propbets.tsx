// pages/about.jsx

import React from 'react';
import GoogleDocReader from '@/app/propbets';

const AboutPage = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page content.</p>
      <div>
        <GoogleDocReader />
      </div>
    </div>
  );
};

export default AboutPage;
