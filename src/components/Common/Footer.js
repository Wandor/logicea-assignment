import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer mt-2">
        <p>
          ©
          {' '}
          <a href="https://jokes.com" rel="noopener noreferrer">
            Laugh Industries
          </a>
          ,
          {' '}
          All Rights Reserved.
        </p>
      </footer>
    );
  }
}

export default Footer;
