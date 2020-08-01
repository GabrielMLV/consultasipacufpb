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
    const comentsRef = firebase.database().ref('coments');
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
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(usercred) {
              var user = usercred.user;
              console.log(user);
              console.log("Anonymous account successfully upgraded"+ user);
              UIkit.modal.dialog('<p style="font-size: 1.5rem; padding-top: 0px; margin-top: 0px;" class="uk-modal-body">Olá '+user.email+'</p>');  
              document.getElementById("emAdmin").innerHTML = "Olá "+ user.email;           
              getAllSugestion();
            }).catch(function(error) {
              console.log("Error upgrading anonymous account"+ error);
            });
        }

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
                    html += '<dd>Comentário: '+childData.message+' </<dd>';
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


};