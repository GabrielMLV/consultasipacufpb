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
    visitRef.on("value", snap => {
        var arrCount = [];
        var resp = snap.val();
        for (v in resp) {
            arrCount.push(v);
        }
        document.getElementById("rendVisit").innerHTML = arrCount.length;
        //console.log(arrCount.length);

    });
    
    firebase.database().ref('visits/').orderByChild("date_visit").limitToLast(10).on("value", snap => {
        document.getElementById("spinV").style.display = "none";
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
                    label: 'Últimos 10 acessos',
                    borderColor: 'rgba(153, 102, 255, 0.2',
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(153, 102, 255, 1)'
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


};