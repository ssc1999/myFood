const popup_container = document.getElementById('popup_container');
const close = document.getElementById('close');
const form = document.getElementById("myForm");
form.addEventListener("submit", registerUser);

close.addEventListener('click', () => {
    popup_container.classList.remove('show');
});

async function registerUser(event) {
    console.log("registerUser")
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const result = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        })
    })

    const { status, error } = await result.json();

    // console.log({data});

    const processErrorMessage = ({ code, message }) => {
        switch (code) {
            case 1:
                return "Invalid username. Please make sure your username doesn't contain any invalid characters like '?, !, <, >, @, #, $, %, *, ^, (, )'."
            case 2:
                return "Invalid password. Please make sure your password doesn't contain any invalid characters like '?, !, <, >, @, #, $, %, *, ^, (, )'."
            case 3:
                return "Password not long enough or doesn't include special characters."
            case 4:
                return "This user alredy exists. Please try to log in or use a different username."
            default:
                return `Unknown error: ${code}. ${message}`
        }
    }

    const isOk = status === 'ok'
    const title = isOk
        ? "Register completed successfully"
        : "Something went wrong"

    const paragraph = isOk
        ? "To finish the registration process you have to go back to the login page and enter your credentials."
        : processErrorMessage(error)

    document.getElementById("resultH4").innerHTML = title
    document.getElementById("resultP").innerHTML = paragraph

    popup_container.classList.add('show');
}