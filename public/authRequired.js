firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        initPage();
    }
    else {
        window.location.replace("/login.html");
    }
});

