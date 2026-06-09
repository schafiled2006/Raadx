const submit = document.getElementById("btn-link");
const eye = document.getElementById("input-img");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passError = document.getElementById("password-error");

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const token = localStorage.getItem("token");
if (token) {
    window.location.replace("./profile.html");
}

const submitClick = async () => {
    let T = 0;
    let emailValue = emailInput.value;
    let passValue = passInput.value;
    let nameValue = nameInput.value;

    if (nameValue.length < 3) {
        nameError.textContent = "minimum 3 characters required"
    }
    else {
        nameError.textContent = "";
        T = T + 1;
    }

    if (!emailReg.test(emailValue)) {
        emailError.textContent = "email is invalid !"
    }
    else {
        emailError.textContent = "";
        T = T + 1;
    }

    if (passValue.length < 8) {
        passError.textContent = "minimum 8 characters required"
    }
    else {
        passError.textContent = "";
        T = T + 1;
    }

    if (T === 3) {
        const userData = {
            name: nameValue,
            email: emailValue,
            password: passValue
        }

        const res = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.accessToken);

            window.location.replace("./profile.html");
        }
        else {
            alert(data.message)
        }
    }

}

const eyeChange = () => {
    if ((eye.getAttribute("src").includes("../images/Sign up & Login/eye.png"))) {
        eye.src = "../images/Sign up & Login/show.png";
        passInput.type = "text";
    }
    else {
        eye.src = "../images/Sign up & Login/eye.png"
        passInput.type = "password";
    }
}

eye.addEventListener("click", eyeChange)

submit.addEventListener("click", submitClick);



