var db = firebase.firestore();

var userList = new Array();

function initPage() {
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
    var modal = document.getElementById('myModal' + (index + 1).toString());

    var image = card.getElementsByClassName('match-user-image')[0];
    var name = card.getElementsByClassName('match-user-name')[0];
    var subjects = card.getElementsByClassName('match-user-subject')[0];

    var modalName = modal.getElementsByClassName('match-user-name')[0];
    var modalImage = modal.getElementsByClassName('match-user-image')[0];

    var newMatch = userList.pop();
    if(newMatch == undefined) {
        card.innerHTML = '<h3>No more matches</h3>';
    }
    else{
        var data = newMatch.data();

        const subjectNames = ["Math", "Science", "History", "English", "French", "Spanish"];

        var weakSubjects = '';
        var weaks = [data.badMath, data.badScience, data.badHistory, data.badEnglish, data.badFrench, data.badSpanish];

        for(let i = 0; i < weaks.length; i++) {
            if(weaks[i]) {
                weakSubjects += `<p>${subjectNames[i]}</p>`;
            }
        }

        image.innerHTML = `<img src="/Profiles/${data.profilePicture}.png">`;
        name.innerHTML = `<h3>${data.fname} ${data.lname}</h3>`;

        modalImage.innerHTML = `<img src="/Profiles/${data.profilePicture}.png">`;
        modalName.innerHTML = `<h3>${data.fname} ${data.lname}</h3>`;

        subjects.innerHTML = weakSubjects;
    }
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

