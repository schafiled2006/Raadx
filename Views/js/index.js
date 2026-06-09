const messageUpdate = () => {
    const messageElemnt = document.getElementById("header-title");
    const now = new Date();
    const hour = now.getHours();
    let text = "";

    if (hour >= 5 && hour <= 12) {
        text = "Good morning";
    }
    else if (hour >= 12 && hour <= 17) {
        text = "Good afternoon";
    }
    else if (hour >= 17 && hour <= 22) {
        text = "Good evening";
    }
    else {
        text = "Good night";
    }

    messageElemnt.textContent = text;

};


document.addEventListener("DOMContentLoaded", messageUpdate);