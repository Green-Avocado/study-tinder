var db = firebase.firestore();

function register() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pword").value;

    validity = fieldsValid();

    if(validity == 0) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(() => {
                        populateUserData();
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
    else if(validity == -1) {
        alert("Error: imcomplete form");
    }
    else if(validity == -2) {
        alert("Error: passwords do not match");
    }
}

function fieldsValid() {
    var valid = 0;

    if(
        document.getElementById('email').value == '' ||
        document.getElementById('fname').value == '' ||
        document.getElementById('lname').value == '' ||
        document.getElementById('pword').value == ''
    ) {
        valid = -1;
    }
    else if(document.getElementById('pwordc').value != document.getElementById('pword').value) {
        valid = -2;
    }

    return valid;
}

function populateUserData() {
    var user = firebase.auth().currentUser;
    var userDB = db.collection('users').doc(user.uid)

    var pfp = 0;

    if(document.getElementById('beige').checked) pfp = 1; 
    else if(document.getElementById('blue').checked) pfp = 2; 
    else if(document.getElementById('pink').checked) pfp = 3; 
    else if(document.getElementById('green').checked) pfp = 4; 
    else if(document.getElementById('yellow').checked) pfp = 5; 

    userDB.set({
        fname : document.getElementById('fname').value,
        lname : document.getElementById('lname').value,

        goodMath : document.getElementById('goodMath').checked,
        badMath : document.getElementById('badMath').checked,

        goodScience : document.getElementById('goodScience').checked,
        badScience : document.getElementById('badScience').checked,

        goodHistory : document.getElementById('goodHistory').checked,
        badHistory : document.getElementById('badHistory').checked,

        goodEnglish : document.getElementById('goodEnglish').checked,
        badEnglish : document.getElementById('badEnglish').checked,

        goodFrench : document.getElementById('goodFrench').checked,
        badFrench : document.getElementById('badFrench').checked,

        goodSpanish : document.getElementById('goodSpanish').checked,
        badSpanish : document.getElementById('badSpanish').checked,

        availableMonday : document.getElementById('monday').value,
        availableTuesday : document.getElementById('tuesday').value,
        availableWednesday : document.getElementById('wednesday').value,
        availableThursday : document.getElementById('thursday').value,
        availableFriday : document.getElementById('friday').value,
        availableSaturday : document.getElementById('saturday').value,
        availableSunday : document.getElementById('sunday').value,

        profilePicture : pfp
    })
        .then(() => {
            window.location.replace("/index.html");
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(errorMessage);
        });
}

