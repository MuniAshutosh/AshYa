import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Engagement from './pages/Engagement';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('Home')
);
ReactDOM.render(
  <React.StrictMode>
    <Engagement />
  </React.StrictMode>,
  document.getElementById('Engagement')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

function initializeIntroAnimation() {
  let delay = 0;
  let animationSpeed = 0.3;
  let paths = document.querySelectorAll('g#stroke path');

  paths.forEach((path, idx) => {
    if (path.id === 'dot') {
      path.style.animation = `2s linear ${
        (idx - 1) * animationSpeed
      }s forwards drop`;
      return;
    }

    let pathLength = Math.ceil(path.getTotalLength());
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.animation = `0.4s linear ${idx * animationSpeed}s forwards draw`;
    delay = idx * animationSpeed;
  });

  console.log('total delay' + delay);

  document.documentElement.style.setProperty(
    '--up-animation-delay',
    delay + 0.8 + 's'
  );
}

function populateNavMenuAndAddListners() {
  const hamburgerMenu = document.querySelector('.navbar-items.hamburger-menu');
  const menu = document.querySelector('.menu');
  const eventsList = document.querySelectorAll('.event');
  const menuLinksList = document.querySelector('.menu ul');

  eventsList.forEach((item) => {
    let liNode = `<li><img src="assets/images/rings_cropped.jpg" alt=""><a href="#${item.id}">${item.id}</a></li>`;
    menuLinksList.innerHTML += liNode;
  });

  eventsList.forEach((event) =>
    event.addEventListener('click', () => {
      menu.dataset.visible = false;
      hamburgerMenu.dataset.opened = false;
    })
  );

  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', () => {
      menu.dataset.visible = false;
      hamburgerMenu.dataset.opened = false;
    });
  });

  hamburgerMenu.addEventListener('click', () => {
    if (menu.dataset.visible === 'true') {
      menu.dataset.visible = false;
      hamburgerMenu.dataset.opened = false;
    } else {
      menu.dataset.visible = true;
      hamburgerMenu.dataset.opened = true;
    }
  });
}

initializeIntroAnimation();
populateNavMenuAndAddListners();
