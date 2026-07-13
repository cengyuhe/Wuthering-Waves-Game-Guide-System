let timeLeft = 60;
let countdown = null;

function startCountdown()
{
    const timer =
        document.getElementById(
            "timer"
        );

    if(countdown)
    {
        clearInterval(
            countdown
        );
    }

    countdown =
        setInterval(() =>
        {
            timeLeft--;

            timer.innerText =
                timeLeft;

            if(timeLeft <= 0)
            {
                clearInterval(countdown);

                countdown = null;

                timer.innerText = "Expired";
                timer.classList.add("expired");

                document.getElementById("resendBtn").disabled = false;
            }
        },
        1000);
}

async function verifyCode(event)
{
    event.preventDefault();

    const code =
        document
            .getElementById(
                "verifyCodeInput"
            )
            .value
            .trim();

    const email =
        localStorage.getItem(
            "reset_email"
        );

    const response =
        await fetch(
            "../php/signin.php?action=verify_code",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    code
                })
            }
        );

    const result =
        await response.json();

    if(result.success)
    {
        window.location.href =
            "reset_password.html";
    }
    else
    {
        alert(result.message);
    }
}

async function resendCode()
{
    const email =
        localStorage.getItem(
            "reset_email"
        );

    const response =
        await fetch(
            "../php/signin.php?action=forgot_password",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email
                })
            }
        );

    const result =
        await response.json();

    if(result.success)
    {
        alert(
            "New verification code sent."
        );

        timeLeft = 60;

        document.getElementById("timer").innerText = "60";

        document.getElementById("resendBtn")
        
        .disabled = true;

        startCountdown();
    }

    const timer =
        document.getElementById("timer");

        timer.innerText = "60";

        timer.classList.remove("expired");
}

window.onload = () =>
{
    startCountdown();
};