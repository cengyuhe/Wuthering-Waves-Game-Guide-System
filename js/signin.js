let loginAttempts = 0;

async function registerUser(event)
{
    event.preventDefault();
    
    const username =
        document.getElementById(
            "registerUsername"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;

    if(username.length < 3)
    {
        alert(
            "Username must be at least 3 characters."
        );
        return;
    }

    if(password.length < 8)
    {
        alert(
            "Password must be at least 8 characters."
        );
        return;
    }

    if(password !== confirmPassword)
    {
        alert(
            "Passwords do not match."
        );
        return;
    }

    const response =
        await fetch(
            "../php/signin.php?action=register",
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

    const result =
        await response.json();

    if(result.success)
{
    localStorage.setItem(
        "register_success",
        "1"
    );

    window.location.replace("signin.html");
}
    else
    {
        alert(
            result.message ||
            "Registration failed."
        );
    }
}

async function loginUser(event)
{
    event.preventDefault();

    try
    {
        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();

        const password =
            document.getElementById(
                "loginPassword"
            ).value;

        const response =
            await fetch(
                "../php/signin.php?action=login",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":
                        "application/json"
                    },
                    body:JSON.stringify({
                        email,
                        password,
                        remember_me:
                        document.getElementById(
                            "rememberMe"
                        ).checked
                    })
                }
            );

        const text = await response.text();

        console.log(text);

        const result = JSON.parse(text);

        if(result.success)
        {
            window.location.replace(
                "./index.html"
            );
        }
        else
        {
            alert(
                "Wrong email or password."
            );
        }
    }
    catch(error)
    {
        console.error(error);

        alert(
            "Login request failed."
        );
    }
}

async function logoutUser()
{
    await fetch(
        "../php/signin.php?action=logout"
    );

    window.location.replace("index.html");
}

async function checkLoginStatus()
{
    try {
        const response = await fetch("../php/signin.php?action=check_login");
        const result = await response.json();

        const signinBtn = document.getElementById("signinBtn");
        const registerBtn = document.getElementById("registerBtn");
        const favoriteBtn = document.getElementById("favoriteBtn");
        const logoutBtn = document.getElementById("logoutBtn");

        if (!signinBtn) return;

        if(result.logged_in) {
            signinBtn.style.display = "none";
            if(registerBtn) registerBtn.style.display = "none";
            favoriteBtn.style.display = "block";
            logoutBtn.style.display = "block";
        } else {
            signinBtn.style.display = "block";

        if(registerBtn)
        {
            registerBtn.style.display = "block";
        }

    favoriteBtn.style.display = "none";
    logoutBtn.style.display = "none";
}
    } catch(error) {
        console.error(error);
    }
}

function switchAuthView(view)
{
    const signinView =
        document.getElementById("view-signin");

    const signupView =
        document.getElementById("view-signup");

    if(view === "signup")
    {
        signinView.classList.remove("active");
        signupView.classList.add("active");
    }
    else
    {
        signupView.classList.remove("active");
        signinView.classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    checkLoginStatus();

    if(sessionStorage.getItem("register_success"))
{
    alert(
        "Registration successful. Please sign in."
    );

    sessionStorage.removeItem(
        "register_success"
    );
}
});

function checkPasswordMatch()
{
    const passwordInput =
        document.getElementById(
            "registerPassword"
        );

    const confirmInput =
        document.getElementById(
            "confirmPassword"
        );

    const msg =
        document.getElementById(
            "passwordMatchMessage"
        );

    if(
        !passwordInput ||
        !confirmInput ||
        !msg
    )
    {
        return;
    }

    const password =
        passwordInput.value;

    const confirm =
        confirmInput.value;

    if(confirm === "")
{
    msg.innerText = "";
}
else if(password !== confirm)
{
    msg.innerText =
        "✗ Passwords do not match";

    msg.style.color =
        "red";
}
else if(password.length < 8)
{
    msg.innerText =
        "Password must be at least 8 characters";

    msg.style.color =
        "orange";
}
else
{
    msg.innerText =
        "✓ Passwords match";

    msg.style.color =
        "green";
}
}

document
.getElementById("registerPassword")
?.addEventListener(
    "input",
    checkPasswordMatch
);

document
.getElementById("confirmPassword")
?.addEventListener(
    "input",
    checkPasswordMatch
);

