const submit = document.getElementById("btn-link");
const eye = document.getElementById("input-img");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");

const emailError = document.getElementById("email-error");
const passError = document.getElementById("password-error");

const emailReg = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(0|0098|\+98)?9\d{9})$/;
const phoneReg = /^0?9\d{9}$/;

const token = localStorage.getItem("token");
if (token) {
    window.location.replace("./profile.html");
}

const submitClick = async () => {
    let T = 0;
    let emailValue = emailInput.value;
    let passValue = passInput.value;
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

    if (T === 2) {
        const userData = {
            email: emailValue,
            password: passValue
        }

        const res = await fetch("http://localhost:4000/auth/login", {
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

eye.addEventListener("click", eyeChange);

submit.addEventListener("click", submitClick);