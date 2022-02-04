// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

const pass_field = document.querySelector('.password');
const show_btn = document.querySelector('.show');
const signup = document.querySelector('.signup');
let forgot = document.getElementById('forgot');
let login_btn = document.getElementsByTagName('button')[0];
let login = document.getElementsByTagName('h1')[0];
let form = document.getElementById('form');

show_btn.addEventListener('click', () => {
  if (pass_field.type === 'password') {
    pass_field.type = 'text';
    show_btn.textContent = 'HIDE';
  } else {
    pass_field.type = 'password';
    show_btn.textContent = 'SHOW';
  }
});

login_btn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = sha256(pass_field.value);
  const loginInfo = { email: email, password: password };

  if (login.innerHTML == 'Sign Up') {
    loginInfo.name = document.getElementById('name-input').value;

    // REGISTER
    await fetch('api/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
    });
  } else {
    // LOGIN
    await fetch('api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
    });
  }
  setTimeout(() => {
    window.location.href = './userAccount.html';
  }, 300);
});

signup.addEventListener('click', () => {
  if (login.innerHTML == 'Sign Up') {
    login.innerHTML = 'Login';
    login_btn.innerHTML = 'LOGIN';
    forgot.style.display = 'contents';
    signup.textContent = 'Or Sign Up Now';
    let added_input = document.getElementById('added-input');
    added_input.remove();
  } else {
    login.innerHTML = 'Sign Up';
    signup.textContent = 'Or Login Now';
    login_btn.innerHTML = 'SIGN UP';
    forgot.style.display = 'none';
    const contents = `
    <div id="added-input" class="field">
    <span><i class='bx bxs-user'></i></span>
    <input type="text" id="name-input" required placeholder="Full Name">
    </div>
    `;
    form.insertAdjacentHTML('afterbegin', contents);
  }
});
