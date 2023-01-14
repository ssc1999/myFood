const submit = document.getElementById("submit");
const popup_container = document.getElementById('popup_container');
const close = document.getElementById('close');

close.addEventListener('click', () => {
    popup_container.classList.remove('show');
});

submit.addEventListener('click', () => {
    console.log("ha entrado solo mi rey");
    changePassword()
});

async function changePassword(event) {
    console.log("registerUser")

    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const token = localStorage.getItem("token");

    var title = undefined;
    var paragraph = undefined;
    console.log("Token: ", token)
    console.log("Password: ", password)
    if (password === password2) {
        const result = await fetch("/api/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                newPassword: password,
            })
        })
        const { status, error } = await result.json();

        const processErrorMessage = ({ code, message }) => {
            switch (code) {
                case 1:
                    return "Password not long enough or doesn't include special characters."
                case 2:
                    return "Invalid token"
                default:
                    return `Unknown error: ${code}. ${message}`
            }
        }

        const isOk = status === 'ok'
        title = isOk
            ? "Done!"
            : "Something went wrong"

        paragraph = isOk
            ? "Password succesfully changed"
            : processErrorMessage(error)
    } else {
        title = "Error"
        paragraph = "Please introduce the same password in both textfields"
    }

    document.getElementById("resultH4").innerHTML = title
    document.getElementById("resultP").innerHTML = paragraph

    popup_container.classList.add('show');
}