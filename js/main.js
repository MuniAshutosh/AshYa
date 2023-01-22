// const randomPicId = Math.round(Math.random()) + 1
// const imgEl = document.querySelector(".first-page img")
const videoEl = document.querySelector('video');
// imgEl.src = `./assets/pic${randomPicId}_4x3 ratio.jpeg`
videoEl.playbackRate = 0.5;

text =
  'Two people to unite them all <br> Two people to find them <br> Two people to bring them all and <br> In the happiness bind them';
h1 = document.getElementById('mainText');

TweenMax.set('#dot', {
  yPercent: -1500,
});

TweenMax.set('.path', {
  drawSVG: '0%',
});

gsap.set('body', { overflow: 'hidden' });

tl = gsap.timeline();

tl.from('.ganesha', { opacity: 0, duration: 3 }).to('.ganesha', {
  opacity: 0,
  duration: 2,
});

writeTL = gsap.timeline();
writeTL.timeScale(2);
window.scrollTo(0, 0);
writeTL
  .to('#A1', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#A2', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#A3', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#A4', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#A5', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#A6', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#A7', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#s1', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#s2', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#s3', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#h1', { drawSVG: '100%', ease: Linear.easeNone })
  .to('#h2', { drawSVG: '100%', ease: Linear.easeNone })
  .from('#dot', 0.01, { autoAlpha: 0 }, '-=0.03')
  .to('#dot', 0.4, { yPercent: -700, ease: 'bounce' }, '-=0.01')
  .to('#dot', 0.9, { yPercent: 0, ease: 'bounce' }, '-=0.4')
  .to('#dot', { ease: 'bounce', transformOrigin: 'top', delay: -0.8 })
  .to('#Y1', { drawSVG: '-100%', ease: Linear.easeNone }, '<') // -ve hundred cause the path are generated ulta
  .to('#Y2', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#Y3', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#Y4', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#Y5', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#Y6', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#Y7', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#Y8', { drawSVG: '-100%', ease: Linear.easeNone }, '>')
  .to('#a1', { drawSVG: '100%', ease: Linear.easeNone }, '>')
  .to('#a2', { drawSVG: '100%', ease: Linear.easeNone }, '>');

tl.add(writeTL, '<');
tl.to(
  'section.intro-animation',
  { top: 0, height: '9vh', ease: 'easeInOut', duration: 2 },
  'intro'
)
  .to('h1', {
    duration: 5,
    text: {
      value: text,
      speed: 0.81,
    },
    ease: 'none',
  })
  .from('.chevron-container', { opacity: 0 }, '>+3');

// TODO: Add the scroll down animation
// tl.timeScale(5);

tl.call(
  function () {
    videoEl.play();
    gsap.set('body', { overflow: 'unset' });
  },
  null,
  'intro+=2'
);

// tl.pause()

ScrollTrigger.create({
  trigger: '.engagement',
  // start: 'bottom top',
  once: true,
  // markers: true,
  onEnter: function () {
    gsap.fromTo(
      'img.done',
      {
        opacity: 0,
        scale: 5,
      },
      {
        opacity: 1,
        scale: 1,
      }
    );
  },
});
