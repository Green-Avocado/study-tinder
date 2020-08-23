function login() {
    var email = document.getElementById("namebar").value;
    var pass = document.getElementById("passwordbar").value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then(() => {
                    window.location.href = "/home.html";
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    alert(errorMessage);
                });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(errorMessage);
        });
}

function forgotPass() {
    //TODO
}

function newUser() {
    window.location.href = "/register.html";
}

