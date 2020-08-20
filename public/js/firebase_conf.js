window.onload = function () {
    moment.locale('pt-br');
    // Your web app's Firebase configuration
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
    const commentsRef = dbRef.child('comments');
    const visitRef = dbRef.child('visits');
   // const manutentionRef = dbRef.child('manutention');
    //console.log(Date.now())
    var url_atual = window.location.href;
    var urlp = url_atual.split("///");
    if(urlp[0] == "file:"){
        //console.log("Local");     
        //window.location.href
/*         var inManutention = false;
        manutentionRef.on("value", snap => {
            console.log(snap.val());
            inManutention = snap.val();
            if(inManutention == true){
                callManutention();         
            }else{
                //callNormalPage();
                const queryString = window.location.href;
                console.log(queryString);
            }
        }); */
    }else{   
        //console.log("Remote");
        setTimeout(function(){  
            var _date = moment().format('L') + " "+ moment().format('LTS');
            setTimeout(function(){
                visitRef.push();
                var resId = Date.now();
                firebase.database().ref('visits/'+resId).set({
                    visit: 1,
                    date_visit: _date    
                });
            },200);
            
        },200);
    }

  
 

 /*    const commentsListUI = document.getElementById("commentsList"); 
    commentsRef.on("value", snap => {  
        var html = ""; 
        let comment = snap.val();
        html += '<h2>Comentários</h2>';
        comment.forEach(function(childSnapshot) {
            var childData = childSnapshot;
            html += '<article class="uk-comment uk-comment-primary" style="border-radius:10px; -webkit-box-shadow: 0px 1px 15px -4px #999; box-shadow: 0px 1px 15px -4px #999; margin-bottom:10px;">';
            html += '<header class="uk-comment-header">';
            html += '<div class="uk-grid-medium uk-flex-middle" uk-grid>';
            html += '<div class="uk-width-auto">';
            html += '<img class="uk-comment-avatar" src="images/avatar.png" width="60" height="60" alt="">';
            html += '</div>';
            html += '<div class="uk-width-expand">';
            html += '<h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">'+childData.name_user+'</a></h4>';
            html += '<ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">';
            html += '<li><a href="#">12 dias atrás</a></li>';
            html += '</ul>';
            html += '</div>';
            html += '</div>';
            html += '</header>';
            html += '<div class="uk-comment-body">';
            html += '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>';
            html += '</div>';
            html += '</article>';

        });
        commentsListUI.innerHTML = html;                
    }); */

    
}

$(document).on("click", ".loginGoogle", function(e){
    var provider = new firebase.auth.GoogleAuthProvider();
    //firebase.auth().languageCode = 'pt';
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        var token = result.credential.accessToken;
        // The signed-in user info.  
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});


function callManutention(){
    window.location.href = "file:///C:/Users/Gabriel%20M/Documents/Consultas%20SIPAC/consultasipacufpb/public/manutencao.html";
}

function callNormalPage(){
    window.location.href = "file:///C:/Users/Gabriel%20M/Documents/Consultas%20SIPAC/consultasipacufpb/public/index.html";
}