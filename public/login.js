function login() {
    var email = document.getElementById("namebar").value;
    var pass = document.getElementById("passwordbar").value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistance.SESSION)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then(() => {
                    window.location.href = "/home.html";
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMEssage);
                    alert(errorMessage);
                });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMEssage);
            alert(errorMessage);
        });
}

function forgotPass() {
    //TODO
}

function newUser() {
    window.location.href = "/register.html";
}

