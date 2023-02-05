// utility methods
TSH = (s) => {
  for (var i = 0, h = 9; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h ^ (h >>> 9);
};

debg = false;

log = (text) => {
  if (debg) {
    console.log(text);
  }
};

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

//global variables
const CONFIG =
  'https://script.google.com/macros/s/AKfycbxOUSt12HrbTVBXmXKIC-1oGmZhAkZQcGiQjRexr8lg3LfeX7HvJcB18zO8BTigMwFE/exec';
let MACRO = '';

fetch(CONFIG)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    MACRO = res.MACRO;
  });
let ip = '',
  platform = '',
  appversion = '',
  uuid = '';

let options = {
  threshold: 0.9,
};

let currentSectionVisible = 'intro';

window.onload = function () {
  myCanvas.height = document.body.clientHeight;
  myCanvas.width = document.body.clientWidth;
  document.body.insertBefore(myCanvas, document.body.firstElementChild);
};

const myCanvas = document.createElement('canvas');
myCanvas.className = 'overlay';
myCanvas.style.position = 'absolute';
myCanvas.style.zIndex = -20;
debg && (myCanvas.style.zIndex = 20);
let ctx = myCanvas.getContext('2d');
myCanvas.style.opacity = 0.5;
!debg &&
  (myCanvas.style.visibility = 'hidden') &&
  (myCanvas.style.display = 'none');

let observer = new IntersectionObserver(function handleIntersection(entries) {
  entries.forEach((_) => {
    if (_.isIntersecting) {
      currentSectionVisible = _.target.className;
      log(
        `${MACRO}?ip=${ip}&time=${new Date()}&platform=${platform}&appversion=${appversion}&uuid=${uuid}&page=${
          _.target.className
        }`
      );
      fetch(
        `${MACRO}?ip=${ip}&time=${new Date()}&platform=${platform}&appversion=${appversion}&uuid=${uuid}&page=${
          _.target.className
        }`,
        {
          method: 'POST',
          body: myCanvas.toDataURL(),
        }
      );
      //   observer.unobserve(_.target);
    }
  });
}, options);

fetch('https://api.ipify.org')
  .then((res) => {
    return res.text();
  })
  .then((res) => {
    ip = res;
    platform = navigator.platform;
    appversion = navigator.appVersion;
    uuid = TSH(ip + platform + appversion);
    document.querySelectorAll('section').forEach((el) => observer.observe(el));
  });

// events

document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    fetch(
      `${MACRO}?ip=${ip}&time=${new Date()}&platform=${platform}&appversion=${appversion}&uuid=${uuid}&page=${'Page is hidden'}`,
      {
        method: 'POST',
        body: myCanvas.toDataURL(),
      }
    );
  } else {
    fetch(
      `${MACRO}?ip=${ip}&time=${new Date()}&platform=${platform}&appversion=${appversion}&uuid=${uuid}&page=${'Page is visible'}`,
      {
        method: 'POST',
        body: myCanvas.toDataURL(),
      }
    );
  }
});

window.onbeforeunload = function () {
  // clearInterval(inn);
  fetch(
    `${MACRO}?ip=${ip}&time=${new Date()}&platform=${platform}&appversion=${appversion}&uuid=${uuid}&page=Page is closed`,
    {
      method: 'POST',
      body: myCanvas.toDataURL(),
    }
  );
};

window.onpointermove = debounce((event) => mouseEvent(event));

window.onpointerover = debounce((event) => mouseEvent(event));

window.onresize = function () {
  myCanvas.height = document.body.clientHeight;
  myCanvas.width = document.body.clientWidth;
  ctx = myCanvas.getContext('2d');
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
};

//

// siteVisit = new Map();

inn = setInterval(() => {
  log(currentSectionVisible);

  ctx.fillStyle = 'rgba(12, 0, 220,0.01)';

  ctx.fillRect(
    window.pageXOffset,
    window.pageYOffset,
    window.innerWidth,
    window.innerHeight
  );
  // if (siteVisit.has(currentSectionVisible)) {
  //   siteVisit.set(
  //     currentSectionVisible,
  //     siteVisit.get(currentSectionVisible) + 1
  //   );
  // } else {
  //   siteVisit.set(currentSectionVisible, 1);
  // }
}, 1000);

///

function mouseEvent(event) {
  ctx.beginPath();
  ctx.arc(event.pageX, event.pageY, 2, 0, Math.PI * 2, false);
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  // if (siteVisit.has(event.pageX + ',' + event.pageY)) {
  //   siteVisit.set(
  //     event.pageX + ',' + event.pageY,
  //     siteVisit.get(event.pageX + ',' + event.pageY) + 1
  //   );
  // } else {
  //   siteVisit.set(event.pageX + ',' + event.pageY, 1);
  // }
  log('mouse move ' + event.pageX, event.pageY);
}

var download = function () {
  var link = document.createElement('a');
  link.download = `snap_${new Date()}.png`;
  link.href = document.querySelector('.overlay').toDataURL();
  link.click();
};
