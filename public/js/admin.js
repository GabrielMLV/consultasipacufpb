window.onload = function () {
    $('#preloader .inner').fadeOut();
    $('#preloader').delay(350).fadeOut('slow'); 
    $('body').delay(350).css({'overflow': 'visible'});
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
    const comentsRef = firebase.database().ref('coments');


 /*    var today = moment().format('L');
    console.log(today);
    var resId = Date.now();
    visitRef.orderByChild("date_visit").startAt( resId ).on( "value" , function ( snapshot )  {
        console.log(snapshot.numChildren());
    });  */

    visitRef.on("value", snap => {
        var arrCount = [];
        var arrToday = [];
        var arrYesterday = [];
        var arrBeforeYesterday = [];
        //console.log(snap.numChildren());
        var resp = snap.val();     
        for (v in resp) {
            //console.log(v);
            var dateFormated = moment(parseInt(v)).format('L');
            if (dateFormated == moment().format('L')){
                arrToday.push(dateFormated);
            }else if (dateFormated == moment().subtract(1, 'days').format('L')){
                arrYesterday.push(dateFormated);
            }else if (dateFormated ==  moment().subtract(2, 'days').format('L')){
                arrBeforeYesterday.push(dateFormated);
            }
           
            arrCount.push(v);           
        }
        showChartDays(arrToday.length, arrYesterday.length, arrBeforeYesterday.length);
        document.getElementById("rendVisit").innerHTML = arrCount.length;
       

    });
    
    firebase.database().ref('visits/').limitToLast(5).on("value", snap => {
        //document.getElementById("spinV").style.display = "none";
        var date_hour_now = 'Última consulta ao banco em: <span>'+moment().format('L') +' - '+ moment().format('LTS')+'</span>';
        document.getElementById("lastAtt").innerHTML = date_hour_now;
        var comment;
        var arrIndex = [];
        var arrayChar = [];
        var arrayDate = [];
        comment = snap.val(); 
        //console.log(comment);
        function addToArr(cb){
            for (variavel in comment) {
                arrIndex.push(variavel);
            }
            cb(arrIndex);
        }
        function callCalc(arrIndex){
            for(var i = 0; i < arrIndex.length; i++){
                var _i = parseInt(arrIndex[i]);
                //console.log(comment[_i]);
                arrayChar.push(comment[_i].visit);
                arrayDate.push(comment[_i].date_visit);
            }
            //$('#myChart').load(' #myChart');
            showChart(arrayChar, arrayDate);
        } 
        addToArr(function(arrIndex){
            callCalc(arrIndex);
        });           
       
        /* comment.forEach(function(childSnapshot) {
            console.log(childSnapshot);
        }); */

       /*  visit = comment.visit;
        dateVisit = comment.date_visit
        setTimeout(function(){
            document.getElementById("rendVisit").innerHTML = visit;
            document.getElementById("rendDateVisit").innerHTML = dateVisit;
        },100); */
    });
    
    function showChart(arrayChar, arrayDate){
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
    
            // The data for our dataset
            data: {
                labels: arrayDate,
                datasets: [{
                    label: 'Últimos 5 acessos',
                    borderColor: 'rgba(153, 102, 255, 0.2)',
                    barPercentage: 0.5,
                    barThickness: 'flex',
                    maxBarThickness: 6,
                    minBarLength: 1,
                    borderWidth: 1,
                    data: arrayChar,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
    
            // Configuration options go here
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function showChartDays(arrToday, arrYesterday, arrBeforeYesterday){
        var ctx = document.getElementById('myChartDays').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar', 
            // The data for our dataset
            data: {
                labels: ['Antes de ontem: '+arrBeforeYesterday , 'Ontem: '+arrYesterday, 'Hoje: '+arrToday],
                datasets: [{
                    label: ['Acessos'],
                    borderColor: ['rgba(153, 102, 255, 0.2'],
                    barPercentage: 10,
                    barThickness: 'flex',
                    maxBarThickness: 1,
                    minBarLength: 1,
                    borderWidth: 1,
                    data: [arrBeforeYesterday, arrYesterday, arrToday],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                       
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 162, 235, 1)',                      
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
    
            // Configuration options go here
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    $(document).on("click", ".loginAdmin", function(e){
        var email = document.getElementById("emailAdmin").value;
        var password = document.getElementById("passAdmin").value;
        if(email.trim() == "" || email.length == 0){
            UIkit.modal.dialog('<p style="font-size: 1.5rem; padding-top: 0px; margin-top: 0px;" class="uk-modal-body">Necessário preencher o email.</p>');
            return;
        }else if(password.trim() == "" || password.length == 0){
            UIkit.modal.dialog('<p style="font-size: 1.5rem; padding-top: 0px; margin-top: 0px;" class="uk-modal-body">Necessário preencher a senha.</p>');
            return;
        }else{
            document.getElementById("formAdmin").style.display = "none";
            //firebase.auth().languageCode = 'pt';
            console.log("login");
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(usercred) {
              var user = usercred.user;
              //console.log(user);
              console.log("Anonymous account successfully upgraded"+ user);
              //UIkit.modal.dialog('<p style="font-size: 1.5rem;" class="uk-modal-body">Olá '+user.email+'</p>');  
              document.getElementById("emAdmin").innerHTML = "Olá "+ user.email;           
              getAllSugestion();
              return;
            }).catch(function(error) {
              console.log("Error upgrading anonymous account"+ error);
            });
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    //getAllSugestion();
    function getAllSugestion(){
        comentsRef.once("value", snap => {
            const commentsListUI = document.getElementById("situationList");
            //console.log(snap.numChildren());
            var html = ""; 
            let comment = snap.val();
            console.log(comment);
            if(comment == null || comment == ""){
                html += '<p style="text-align:center">Nenhuma sugestão encontrada.</p>'
                commentsListUI.innerHTML = html;
            }else{
                html += '<h2>Sugestões</h2>';
                for(var i in comment){
                    var childData = comment[i];
                    html += '<dt> Nome: '+childData.name +' - Campus: '+childData.campus + '- Data criação: '+childData.date_created +'</dt>';
                    html += '<dd style="color:black">Comentário: '+childData.message+' </<dd>';
                };
                commentsListUI.innerHTML = html;  
            }       
            /* for (v in resp) {
                arrCount.push(v);
            }  */
            //document.getElementById("rendVisit").innerHTML = snap.numChildren();
            //console.log(arrCount.length);
    
        });
    }
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user != null) {
        user.providerData.forEach(function(profile) {
            console.log("  Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
    }
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log(displayName);
          console.log(email);
          console.log(emailVerified);
          console.log(photoURL);
          console.log(isAnonymous);
          console.log(uid);
          document.getElementById("btnExit").style.display = "";
          document.getElementById("formAdmin").style.display = "none";
         // UIkit.modal.dialog('<p style="font-size: 1.5rem;" class="uk-modal-body">Olá '+user.email+'</p>');  
          document.getElementById("emAdmin").innerHTML = "Olá "+ user.email;           
          getAllSugestion();
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });

    $(document).on("click", ".loginGoogleAdmin", function(e){
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
    
    $(document).on("click", ".loginExit", function(e){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            document.getElementById("btnExit").style.display = "none";
            document.getElementById("formAdmin").style.display = "";
            UIkit.modal.dialog('<p style="font-size: 1.5rem; padding-top: 0px; margin-top: 0px;" class="uk-modal-body">Desconectado</p>'); 
            document.getElementById("emAdmin").innerHTML = "Bem-vindo!"; 
            document.getElementById("situationList").innerHTML = "";
        }).catch(function(error) {
            // An error happened.
        });
    });


};