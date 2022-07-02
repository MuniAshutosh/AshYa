import { Logo } from './Logo';
import React, { useEffect, useRef } from 'react';

function Navigation() {
  let logoSmallRef = useRef({});
  let logoRef = useRef({});

  useEffect(() => {
    logoRef.current.style.tran = '3s linear 12s forwards up';
  });

  return (
    <>
      <div className="nav-wrapper">
        <div ref={logoSmallRef} className="logo">
          <Logo logoRef={logoRef} width={'100vw'} height={'100vh'}></Logo>
        </div>
        <div className="hamburger-icon"></div>
      </div>
      <div className="logo-intro"></div>
    </>
  );
}

export default Navigation;
