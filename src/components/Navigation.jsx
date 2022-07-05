import { Logo } from './Logo';
import React, { useEffect, useRef } from 'react';
function Navigation() {
  let logoRef = useRef({});

  useEffect(() => {
    const NavbarState = {
      OPENED: 1,
      CLOSED: 2,
    };
    let navbarState = NavbarState.CLOSED;

    const hamburgerMenu = document.querySelector('.hamburger-icon');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', function () {
      debugger;
      handleNavbar();
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach((links) => {
      links.addEventListener('click', function () {
        handleNavbar();
      });
    });

    function handleNavbar() {
      switch (navbarState) {
        case NavbarState.CLOSED:
          navbarState = NavbarState.OPENED;
          hamburgerMenu.dataset.opened = true;
          delete navMenu.dataset.hidden;
          break;
        case NavbarState.OPENED:
          navbarState = NavbarState.CLOSED;
          delete hamburgerMenu.dataset.opened;
          navMenu.dataset.hidden = true;
          break;
      }
    }
  });

  return (
    <>
      <nav className="nav-menu" data-hidden="true">
        <ul>
          <li>
            <img src="/assets/images/rings_cropped.jpg" alt="engagement pic" />
            <a href="#root">Engagement</a>
          </li>
        </ul>
      </nav>

      <div className="nav-wrapper">
        <div className="hamburger-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 12">
            <line
              id="line-1"
              className="line-cls"
              x1="1"
              x2="17"
              y1="2"
              y2="2"
            />
            <line
              id="line-2"
              className="line-cls"
              x1="1"
              x2="17"
              y1="2"
              y2="2"
            />
            <line
              id="line-3"
              className="line-cls"
              x1="1"
              x2="17"
              y1="2"
              y2="2"
            />
          </svg>
        </div>

        <div className="logo">
          <strong>Ash.Ya</strong>
        </div>
      </div>

      <div className="logo-intro">
        <Logo logoRef={logoRef}></Logo>
      </div>
    </>
  );
}

export default Navigation;
