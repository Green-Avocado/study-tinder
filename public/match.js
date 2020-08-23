firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        loadUserProfiles();
    }
    else {
        window.location.replace("/login.html");
    }
});

var db = firebase.firestore();

var userList = new Array();

function loadUserProfiles() {
    var user = firebase.auth().currentUser;

    db.collection('users').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.id != user.uid) {
                    userList.push(doc);
                }
            });

            loadAllMatches();
        });
}

function loadAllMatches() {
    var cards = document.getElementsByClassName('cards');

    for(let i = 0; i < cards.length; i++) {
        getMatch(i);
    }
}

function getMatch(index) {
    var card = document.getElementsByClassName('cards')[index];
    var image = card.getElementsByClassName('match-user-image')[0];
    var name = card.getElementsByClassName('match-user-name')[0];

    var newMatch = userList.pop();
    var data = newMatch.data();

    image.innerHTML = `<img src="/Profiles/${data.profilePicture}.png">`;
    name.innerText = `${data.fname} ${data.lname}`;
}

function ignore(index) {
    var user = firebase.auth().currentUser;
    var userDB = db.collection('users').doc(user.uid);

    var card = document.getElementsByClassName('cards')[index];

    getMatch(index);
}

function friend(index) {
    var user = firebase.auth().currentUser;
    var userDB = db.collection('users').doc(user.uid);

    var card = document.getElementsByClassName('cards')[index];

    getMatch(index);
}

