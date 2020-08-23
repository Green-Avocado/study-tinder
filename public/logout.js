function logout() {
    firebase.auth().signOut().then(() => {
        window.location.replace("/");
    });
}

