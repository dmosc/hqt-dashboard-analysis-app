import React from 'react';
import moment from 'moment';
import {FooterContainer} from './elements';

const Footer = () => {
  return (
    <FooterContainer style={{textAlign: 'center'}}>
      HQT ©{moment().format('YYYY')} <br />
      Made with ❤️from Mexico
    </FooterContainer>
  );
};

export default Footer;
