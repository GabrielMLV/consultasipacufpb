window.onload = function () {
    moment.locale('pt-br');

    var firebaseConfig = {
        apiKey: "AIzaSyBP6RKTW6R52UQn81uciReNqlQ9qwheF4c",
        authDomain: "consulta-sipac.firebaseapp.com",
        databaseURL: "https://consulta-sipac.firebaseio.com",
        projectId: "consulta-sipac",
        storageBucket: "consulta-sipac.appspot.com",
        messagingSenderId: "335594209772",
        appId: "1:335594209772:web:10d64238f2f781a33e40c9",
        measurementId: "G-2Y8VEDPJP2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    firebase.database();
    const dbRef = firebase.database().ref();
    const visitRef = dbRef.child('visits');
    var visit, dateVisit;
    visitRef.on("value", snap => {
        comment = snap.val();
        console.log(comment);
        visit = comment.visit;
        dateVisit = comment.date_visit
        setTimeout(function(){
            document.getElementById("rendVisit").innerHTML = visit;
            document.getElementById("rendDateVisit").innerHTML = dateVisit;
        },100);
    });

    

};