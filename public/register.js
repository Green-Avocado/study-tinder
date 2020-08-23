function register() {
    var email = document.getElementById("authEmail").value;
    var pass = document.getElementById("authPass").value;

    validity = fieldsValid();

    if(validity == 0) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistance.SESSION)
            .then(() => {
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(() => {
                        populateUserData();
                        alert('success');
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

    var pfp = 0;

    if(document.getElementById('beige').checked) pfp = 1; 
    else if(document.getElementById('blue').checked) pfp = 2; 
    else if(document.getElementById('red').checked) pfp = 3; 
    else if(document.getElementById('green').checked) pfp = 4; 
    else if(document.getElementById('yellow').checked) pfp = 5; 

    firebase.database().ref('users/' + user.uid).update({
        fname : document.getElementById('fname').value,
        lname : document.getElementById('lname').value,

        good-math : document.getElementById('goodMath').value,
        bad-math : document.getElementById('badMath').value,

        good-science : document.getElementById('goodScience').value,
        bad-science : document.getElementById('badScience').value,

        good-history : document.getElementById('goodHistory').value,
        bad-history : document.getElementById('badHistory').value,

        good-english : document.getElementById('goodEnglish').value,
        bad-english : document.getElementById('badEnglish').value,

        good-french : document.getElementById('goodFrench').value,
        bad-french : document.getElementById('badFrench').value,

        good-spanish : document.getElementById('goodSpanish').value,
        bad-spanish : document.getElementById('badSpanish').value,

        available-monday : document.getElementById('monday').value,
        available-tuesday : document.getElementById('tuesday').value,
        available-wednesday : document.getElementById('wednesday').value,
        available-thursday : document.getElementById('thursday').value,
        available-friday : document.getElementById('friday').value,
        available-saturday : document.getElementById('saturday').value,
        available-sunday : document.getElementById('sunday').value,

        profile-picture : pfp
    });
}

