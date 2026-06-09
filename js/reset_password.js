async function resetPassword(event)
{
    event.preventDefault();

    const password =
        document
            .getElementById(
                "newPassword"
            )
            .value;

    const confirm =
        document
            .getElementById(
                "confirmPassword"
            )
            .value;
    
    if(password.length < 8)
    {
        alert(
            "Password must be at least 8 characters."
        );
        return;
    }

    if(password !== confirm)
    {
        alert(
            "Passwords do not match."
        );
        return;
    }

    const response =
        await fetch(
            "../php/signin.php?action=reset_password",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password
                })
            }
        );

    const result =
        await response.json();

    if(result.success)
    {
        alert(
            "Password reset successful. Please sign in."
        );

        window.location.href =
            "signin.html";
    }
    else
        alert(
            result.message ||
            "Password reset failed."
    );
}