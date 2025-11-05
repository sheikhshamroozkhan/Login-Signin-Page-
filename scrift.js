/* ---------- Tab Switching ---------- */
function openTab(evt, tabName) {
    const tabs = document.getElementsByClassName("tabcontent");
    for (let t of tabs) t.style.display = "none";

    const links = document.getElementsByClassName("tablink");
    for (let l of links) l.className = l.className.replace(" active", "");

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* ---------- Password Show/Hide ---------- */
function togglePass(inputId, eyeIcon) {
    const input = document.getElementById(inputId);
    const icon = eyeIcon.querySelector("i");
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}

/* ---------- Password Strength Check ---------- */
function isStrongPassword(pw) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pw);
}

/* ---------- LocalStorage Helpers ---------- */
const STORAGE_KEY = "userCreds";

function saveUser(name, password) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, password }));
}
function getUser() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

/* ---------- Sign-Up ---------- */
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const pass = document.getElementById("signupPass").value;
    const msg  = document.getElementById("signupMsg");

    if (!name) {
        msg.textContent = "Name is required.";
        msg.className = "message error";
        return;
    }
    if (!isStrongPassword(pass)) {
        msg.textContent = "Password must be ≥8 chars, contain uppercase, lowercase, digit & special char.";
        msg.className = "message error";
        return;
    }

    // Save
    saveUser(name, pass);
    msg.textContent = "Account created successfully!";
    msg.className = "message success";

    // Reset form
    this.reset();
    setTimeout(() => { msg.textContent = ""; }, 3000);
});

/* ---------- Login ---------- */
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("loginName").value.trim();
    const pass = document.getElementById("loginPass").value;
    const msg  = document.getElementById("loginMsg");

    const stored = getUser();

    if (!stored) {
        msg.textContent = "No account found. Please sign up first.";
        msg.className = "message error";
        return;
    }

    if (stored.name === name && stored.password === pass) {
        msg.textContent = "Login successful!";
        msg.className = "message success";
        // Optionally redirect: window.location.href = "dashboard.html";
    } else {
        msg.textContent = "Invalid name or password.";
        msg.className = "message error";
    }

    setTimeout(() => { msg.textContent = ""; }, 4000);
});