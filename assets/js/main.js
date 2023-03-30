const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');
const mainNavItems = document.querySelectorAll('.main-nav > li');
const topButton = document.querySelector('.top-btn');
const hero = document.querySelector('.home .hero');
const heroLeft = document.querySelector('.home .hero .hero-left');
const heroRight = document.querySelector('.home .hero .hero-right');
let heroPosition = 1;

let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

window.onresize = () => {
  vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  // mainNav.style.display = vw > 950 ? 'grid' : 'none';
  if (hero) hero.style.backgroundPosition = 'center top';
};

menuBtn.onclick = () => {
  if (vw > 950) return;
  const display = mainNav.style.display;
  mainNav.style.display = display === 'block' ? 'none' : 'block';
};

mainNavItems.forEach((item) => {
  item.onclick = () => {
    if (vw > 950) return;
    const dropdown = item.children[1];
    if (!dropdown || dropdown.className !== 'mn-dropdown') return;
    dropdown.style.display = 'block';
  };
});

window.onscroll = () => {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ? (topButton.style.display = 'block')
    : (topButton.style.display = 'none');
};

topButton.onclick = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

if (heroLeft) {
  heroLeft.onclick = () => {
    if (vw > 650) return;
    heroPosition = heroPosition === 0 ? 0 : heroPosition - 1;
    hero.style.backgroundPosition =
      heroPosition === 0 ? 'left top' : 'center top';
  };
}

if (heroRight) {
  heroRight.onclick = () => {
    if (vw > 650) return;
    heroPosition = heroPosition === 2 ? 2 : heroPosition + 1;
    hero.style.backgroundPosition =
      heroPosition === 2 ? 'right top' : 'center top';
  };
}

// Gaduates password
PWD = '2c9989bf85f7c4a33caec5e2333631445c8ad1ec33a5612ae9afb586818170a3';

const pwdBox = document.querySelector('.registrar-graduates .pwd');
const gradTable = document.querySelector(
  '.registrar-graduates table.graduates'
);
const pwdForm = document.querySelector('.registrar-graduates form');
if (pwdForm) {
  pwdForm.onsubmit = async (e) => {
    e.preventDefault();
    // const input = pwdForm.elements['pwd'].value;
    const hash = await digest({ message: pwdForm.elements['pwd'].value });
    if (hash !== PWD) {
      alert('Incorrect Password');
      pwdForm.reset();
      return;
    }
    gradTable.style.display = 'table';
    pwdBox.style.display = 'none';
  };
}

const digest = async ({ algorithm = 'SHA-256', message }) =>
  Array.prototype.map
    .call(
      new Uint8Array(
        await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
      ),
      (x) => ('0' + x.toString(16)).slice(-2)
    )
    .join('');
