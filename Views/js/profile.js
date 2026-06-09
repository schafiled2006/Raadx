const token = localStorage.getItem("token");
if (!token) {
    window.location.replace("./login.html");
}

const logout = document.getElementById("logout");
const userName = document.getElementById("userName");

const logoutAccount = () => {
    localStorage.removeItem("token");
    window.location.replace("./login.html");
}

const loadUser = async () => {
    const res = await fetch("http://localhost:4000/auth/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    userName.textContent = data.user.name;

}

logout.addEventListener("click", logoutAccount);
window.addEventListener("DOMContentLoaded", loadUser);