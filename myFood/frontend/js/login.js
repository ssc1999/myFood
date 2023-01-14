const submit = document.getElementById('submit');
const popup_container = document.getElementById('popup_container');
const close = document.getElementById('close');

close.addEventListener('click', () => {
    popup_container.classList.remove('show');
});

submit.addEventListener('click', () => {
    loginUser();
});

// popup_container.classList.add('show');

async function loginUser() {
    console.log("loginUser")

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const result = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        })
    })

    const data = await result.json();

    console.log({ data });

    if (data.status === 'ok') {
        console.log("Got the token: ", data.token);
        localStorage.setItem("token", data.token);
        location.href = 'index.html';
    } else {
        const processErrorMessage = (error) => {
            switch (error.code) {
                case 1:
                    return "Invalid username or password, please try again"
                default:
                    return `Unknown error: ${error.code}. ${error.message}`
            }
        }

        const title = "Something went wrong"
        const paragraph = processErrorMessage(data.error)

        document.getElementById("resultH4").innerHTML = title
        document.getElementById("resultP").innerHTML = paragraph

        popup_container.classList.add('show');
    }
}