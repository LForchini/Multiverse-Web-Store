
// Scrollbar and Navbar menu activation

let header = document.querySelector('header');
let navbar = document.querySelector('.navbar');

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
})


const pass_field = document.querySelector('.password');
const show_btn = document.querySelector('.show');
const signup = document.querySelector(".signup");
let forgot = document.getElementById("forgot");
let login_btn = document.getElementsByTagName("button")[0];
let login = document.getElementsByTagName("h1")[0];
let form = document.getElementsByTagName("form")[0];

show_btn.addEventListener('click', () => {
  if (pass_field.type === "password") {
    pass_field.type = "text";
    show_btn.textContent = "HIDE";
  } else {
    pass_field.type = "password";
    show_btn.textContent = "SHOW";
  }
});

signup.addEventListener("click", () => {
  if (login.innerHTML == "Sign Up") {
    login.innerHTML = "Login";
    login_btn.innerHTML = "LOGIN";
    forgot.style.display = "contents";
    signup.textContent = "Or Sign Up Now";
    let added_input = document.getElementById("added-input");
    added_input.remove();
    
  } else {
    login.innerHTML = "Sign Up";
    signup.textContent = "Or Login Now";
    login_btn.innerHTML = "SIGN UP";
    forgot.style.display = "none";
    const contents = `
    <div id="added-input" class="field">
    <span><i class='bx bxs-user'></i></span>
    <input type="text" required placeholder="Full Name">
    </div>
    `;
    form.insertAdjacentHTML("afterbegin",contents);
  }

  
})










