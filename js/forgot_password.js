async function requestReset(event)
{
    event.preventDefault();

    const email =
        document
            .getElementById("resetEmail")
            .value
            .trim();

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
    localStorage.setItem(
        "reset_email",
        email
    );

    alert(
        "Verification code has been sent to your email."
    );

    window.location.href =
        "verify_code.html";
}
else
{
    console.log(result);

    alert(JSON.stringify(result, null, 2));
}
}