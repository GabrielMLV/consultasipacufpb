$(window).on('load', function () {
    $('#preloader .inner').fadeOut();
    $('#preloader').delay(350).fadeOut('slow'); 
    $('body').delay(350).css({'overflow': 'visible'});
    
    //localStorage.setItem('nome','Jack Sparrow22');
    const verifyLastSearch = localStorage.getItem('last_search');
    if(verifyLastSearch !== null){
        document.getElementById("lastSearch").innerHTML = verifyLastSearch;
    }else{
        document.getElementById("lastSearch").innerHTML = '<span style="font-size:13px;">Bem-vindo!</span>'
    }
    var idAux = localStorage.getItem('id_auxilio');
    if(idAux !== null){
        insertLocalInfos();      
        disabledBtnSarch();
    }
})
var loadSpinn = '<span class="uk-flex uk-flex-center" uk-spinner="ratio: 4.5"></span>';
var obj_default = [
    {
        "status_terminado": false,
        "unidade_destino": "PRAPE - COORDENAÇÃO DE ASSISTÊNCIA E PROMOÇÃO ESTUDANTIS (COAPE) (11.00.63.01)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRÓ-REITORIA DE ADMINISTRAÇÃO (PRA) (11.00.47)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRA - COORDENAÇÃO DE ADMINISTRAÇÃO (11.01.08.02)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRA - ASSESSORIA DE COORDENAÇÃO DE ADMINISTRAÇÃO (11.01.08.96)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRÓ-REITORIA DE ADMINISTRAÇÃO (PRA) (11.00.47)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRA - COORDENAÇÃO DE CONTABILIDADE E FINANÇAS (11.01.08.01)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRA - SEÇÃO ANÁLISE E CONTROLE (11.01.08.01.03.03)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRA - DIVISÃO DE CONTABILIDADE (11.01.08.01.03)",
    },
    {
        "status_terminado": false,
        "unidade_destino": "PRA - DIVISÃO DE ADMINISTRAÇÃO E FINANÇAS (11.01.08.01.02)",
    },
    {
        "status_terminado": true,
        "unidade_destino": "PRA - ARQUIVO DA DAF (11.01.08.01.02.02)",
    }
]

var templateCountDown = `<div style="display: inline-flex;margin: 0px 0px 0px 0px !important;" class="uk-flex uk-flex-middle uk-flex-center uk-text-center uk-grid-small uk-child-width-auto uk-margin" uk-grid uk-countdown="date: {0}">
<label style="padding-left: 1px;">Próxima consulta em </label>
<div style="padding: 0px;">
    <div class="uk-countdown-number uk-countdown-days" style="padding: 0px 5px; font-size: 1rem; font-weight: 900;"></div>
</div>
<div class="uk-countdown-separator" style="font-size: 1rem;padding-left: 0px;">d</div>
<div style="padding: 0px;">
    <div class="uk-countdown-number uk-countdown-hours" style="padding: 0px 5px; font-size: 1rem; font-weight: 900;"></div>
</div>
<div class="uk-countdown-separator" style="font-size: 1rem;padding-left: 0px;">h</div>
 <div style="padding: 0px;">
    <div class="uk-countdown-number uk-countdown-minutes" style="padding: 0px 5px; font-size:1rem; font-weight: 900;"></div>	
</div>
<div class="uk-countdown-separator" style="font-size: 1rem;padding-left: 0px;">m</div>
<div style="padding: 0px;">
    <div class="uk-countdown-number uk-countdown-seconds" style="padding: 0px 5px; font-size: 1rem; font-weight: 900;"></div>
</div>
<div class="uk-countdown-separator" style="font-size: 1rem;padding-left: 0px;">s</div>
</div>`;

$(function() {    
    moment.locale('pt-br');  
/*     $(".my-rating").starRating({
        totalStars: 5,
        emptyColor: 'lightgray',
        hoverColor: '#5f338a',
        activeColor: '#5f338a',
        strokeColor: "black",
        ratedColor: "#5f338a",
        initialRating: 4,
        strokeWidth: 10,
        useGradient: false,
        disableAfterRate: false,
        callback: function(currentRating, $el){
            // make a server call here
            console.log('rated ' + currentRating);
            console.log('DOM element ', $el);
        },
        onHover: function(currentIndex, currentRating, $el){
            $('.live-rating').text(currentIndex);
          },
          onLeave: function(currentIndex, currentRating, $el){
            $('.live-rating').text(currentRating);
          }
    }); */
});

$(document).on("change", "#select_campus", function(e){
    const valueSel = this.value;
    const valueSpl = valueSel.split("-");
    //console.log(valueSpl);
    document.getElementById("select_campus").blur();
    document.getElementById("select_auxilio").disabled = true;
    document.getElementById("idBtnSend").disabled = true; 
    /* const dvAux = document.getElementById("divAuxi");
    dvAux.style.display = "";
    dvAux.classList.add("uk-animation-slide-bottom"); */  
    const url = "https://consultaprocessosipac.herokuapp.com/api/v1/campus/"+valueSpl[0]+"/auxilios";
    //preloader
    document.getElementById("select_auxilio").innerHTML = '<option value="0" selected disabled>Procurando auxilios...</option>';
    getFunction(url, renderAuxilios, errorGetAuxilios);
    e.preventDefault();
    e.stopImmediatePropagation();
});

  $(document).on("change", "#select_auxilio", function(e){   
    disabledBtnSarch()

    e.preventDefault();
    e.stopImmediatePropagation();
});

function disabledBtnSarch(){
    const btnSend = document.getElementById("idBtnSend");
    btnSend.disabled = false; 
    btnSend.style.background = "#5f338a";
}

function renderAuxilios(data){
    //console.log(data);
    var dataParse = JSON.parse(data);
    //console.log(dataParse);
    var dt = dataParse.response.body;
    var html = "";
    document.getElementById("select_auxilio").disabled = false;
    html += '<option value="0" selected disabled>Selecione o auxílio *</option>';
    for(var i = 0; i < dt.length; i++){
        html += '<option value="'+dt[i].tipo_auxilio+'">'+dt[i].nome_visualizacao+'</option>';
    }
    document.getElementById("select_auxilio").innerHTML = html.toString();
    setTimeout(function(){
        const idAux = localStorage.getItem('id_auxilio');
        if( idAux !== null){
            document.getElementById("select_auxilio").value = idAux;
        }
    },200);
}

function errorGetAuxilios(_status){
    //console.log(_status);
    document.getElementById("idSpinnSend").style.display = "none";
    document.getElementById("idBtnSend").style.display = "";
    UIkit.notification({ message: 'Oops! Aconteceu alguma coisa na busca dos auxílios :(  ' + _status, status: 'danger' });
    return;
}


$(document).on("click", ".send", function(e){
    //console.log("Click send");
    document.getElementById("idSpinnSend").style.display = "";
    document.getElementById("idBtnSend").style.display = "none";
    var auxilio = document.getElementById("select_auxilio");
    var campus = document.getElementById("select_campus");
    const checkSaveInfo = document.getElementById("saveSearch");
    const aux = auxilio.value;
    const camp = campus.value.split("-");
    if(auxilio.value == 0 || auxilio.value == null || typeof auxilio.value == "undefined"){
        auxilio.classList.add("uk-form-danger");
        setTimeout(function(){
            auxilio.classList.remove("uk-form-danger"); 
        },3000)
        UIkit.notification({ message: '<span uk-icon="icon: close"></span> Selecione o tipo de auxílio.', status: 'danger' });
        return;
    }else if(campus.value == 0 || campus.value == null || typeof campus.value == "undefined"){
        campus.classList.add("uk-form-danger");
        setTimeout(function(){
            campus.classList.remove("uk-form-danger"); 
        },3000)
        UIkit.notification({ message: '<span uk-icon="icon: close"></span> Selecione o campus.', status: 'danger' });
        return;
    }else{     
        document.getElementById("renderHtmlProcess").innerHTML = loadSpinn;
        //renderProcess(_dt)
        var urlProcess = "https://consultaprocessosipac.herokuapp.com/api/v1/processos?auxilio="+aux+"&campus="+camp[1];
        //console.log(urlProcess);
        if(checkSaveInfo.checked == true){
            localStorage.setItem('id_auxilio', aux);
            localStorage.setItem('id_campus', campus.value);
        }else{
            localStorage.removeItem('id_auxilio');
            localStorage.removeItem('id_campus');
        }
        openLoader();
        getFunction(urlProcess, renderProcess, errorGetProcess);
    }

    e.preventDefault();
    e.stopImmediatePropagation();
})

function getFunction(urlProcess, cbSuccess, cbError) {

    var xmlHttp = new XMLHttpRequest();
    var theUrl = urlProcess;

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //console.log(xmlHttp.responseText);
            cbSuccess(xmlHttp.responseText);
        } else if (xmlHttp.status == 500) {
            cbError(xmlHttp.status);
        } else if (xmlHttp.status == 404) {
            cbError(xmlHttp.status);
        }

    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    //xmlHttp.timeout = 15000;
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlHttp.getResponseHeader('Content-Type');
    //xmlHttp.onprogress = updateProgress;
    xmlHttp.send(null);



    xmlHttp.onerror = function (status) {
        alert("Request failed: " + status);
        document.getElementById("idSpinnSend").style.display = "none";
        document.getElementById("idBtnSend").style.display = "";
    };
}

function updateProgress(evt) {
    if (evt.lengthComputable) {  // evt.loaded the bytes the browser received
        // evt.total the total bytes set by the header
        // jQuery UI progress bar to show the progress on screen
        var percentComplete = (evt.loaded / evt.total) * 100;
        //console.log(percentComplete);
        //$('#progressbar').progressbar("option", "value", percentComplete);
    }
}


function renderProcess(res) {
    closeLoader();
    document.getElementById("idSpinnSend").style.display = "none";
    document.getElementById("idBtnSend").style.display = "";
    moment.locale('pt-br'); 
    var resPars = JSON.parse(res);
    //console.log(resPars);
    var dt = resPars.response.body;
    document.getElementById("renderHtmlProcess").innerHTML = "";
    var html = "";
    document.getElementById("goToDown").click(); 
    if (dt == "" || typeof dt == "undefined" || dt == null ) {
        var rp = Math.floor((Math.random() * 4) + 1);
        html += "<div class='classNoFound' style='text-align:center; margin-top:25px;'><img src='images/gato"+rp+".png' style='width: 140px; height: 140px;'/><h2 style='margin-top: 0px; margin-bottom: 0px;'>Oops!</h2><p style='font-size:1.5rem;margin-top: 0px;'>O processo requisitado não foi encontrado, tente novamente mais tarde.</p></div>";
        //errorGetProcess("Nenhum processo encontrado, tente novamente mais tarde.");
        //saveLast(dt);
    } else { 
        saveLast(dt);
        const t1 = moment(dt.proxima_atualizacao_em).format();
        //const t2 = moment(t1).add(1, 'hour');   
        //console.log(t1);
        const resultDateFormat = (t1);
        //UIkit.countdown("#countRef", {date: resultDateFormat});
        //document.getElementById("countRef").style.display = "";
        const respCount = templateCountDown.replace("{0}", resultDateFormat);	                  
        html += '<article style="margin-top: 20px;" class="page">';
        html += '<h1 class="uk-heading-bullet" style="color: #5f338a; margin-bottom:10px"><span>Resultado</span></h1>';
        html += '<h4 style="margin-top:5px;margin-bottom:0px;">Processo referente a <strong>'+dt.mes_referente+'</strong></h4>';
        html += '<h4 style="margin-top:0px;margin-bottom:0px;">Última consulta aos processos do SIPAC em <strong>'+ moment(dt.atualizado_em).format('LLL') +'</strong>. </h4>';
        html += '<h5 style="margin-top:0px;margin-bottom:10px;">'+respCount+'</h5>';
        html += '<ul class="timeline">';
       // for(var i = 0; i < dt.length; i++){ 

            var status = "";	
            if(dt.status_terminado == true){
                status = "<span style='color:green'><strong>FINALIZADO</strong></span>";   
                html += '<li class="timeline-milestone is-completed timeline-start">'; 
                var title = dt.tipo_auxilio.split("_").join(' ');
                html += '<div class="timeline-action" style="border-top: 3px solid #5f338a;">';
                html += '<h2 class="title"><b>' + title.toUpperCase() + '</b></span></h2>';
                html += '<span><b style="font-size: 16px;">Campus: </b> ' + dt.campus  + '</span>';
                html += '<span class="date"><b>Status:</b> ' + status  + '</span>';
                html += '<div class="content">';
                html += '<b>Unidade de destino:</b> '+dt.unidade_destino;
                html += '</div>';
                html += '<div class="content">';
                html += '<b>Última movimentação em:</b>'+dt.recebido_em;
                html += '</div>';
                html += '<div class="content">';
                html += '<b>Mais informações acessando:</b> <a target="_blank" rel="noopener noreferrer" href="'+dt.link_processo+'">'+dt.link_processo+ "</a>";  
                html += '</div>';
                html += '</div>';
                html += '</li>';     
            }else{
                status = "<span style='color:#1e87f0'><strong>EM ANDAMENTO</strong></span>"
                html += '<li class="timeline-milestone is-completed timeline-start">'; 
                var title = dt.tipo_auxilio.split("_").join(' ');
                html += '<div class="timeline-action" style="border-top: 3px solid #5f338a;">';
                html += '<h2 class="title"><b>' + title.toUpperCase() + '</b></span></h2>';
                html += '<span><b style="font-size: 16px;">Campus: </b> ' + dt.campus  + '</span>';
                html += '<span class="date"><b>Status:</b> ' + status  + '</span>';
                html += '<div class="content">';
                html += '<b>Unidade de destino:</b> '+dt.unidade_destino;  
                html += '</div>';
                html += '<div class="content">';
                html += '<b>Última movimentação em:</b>'+dt.recebido_em;
                html += '</div>';
                html += '<div class="content">';
                html += '<b>Mais informações acessando:</b> <a target="_blank" rel="noopener noreferrer" href="'+dt.link_processo+'">'+dt.link_processo+ "</a>";  
                html += '</div>';
                html += '</div>';
                html += '</li>'; 
                //console.log(dt.unidade_destino);
                for(var i = 0; i < obj_default.length; i++){
                    //console.log(obj_default[i].unidade_destino);                   
                    if(dt.unidade_destino.trim() == obj_default[i].unidade_destino.trim()){
                        //console.log("Entrou aqui")
                        for(var x = i+1; x < obj_default.length; x++){
                            var stats = "";
                            if(x == obj_default.length){
                                stats = "<span style='color:green'><strong>FINALIZADO</strong></span>";   
                                html += '<li class="timeline-milestone is-future timeline-end">'; 
                            }else{
                                stats = "<span style='color:#5858588f'><strong>AGUARDANDO</strong></span>";   
                                html += '<li class="timeline-milestone is-future">'; 
                            }
                            html += '<div class="timeline-action" style="border-top: 3px solid #b5b5b5; background: #f3f3f3ab; -webkit-box-shadow: 0px 0px 0px 0px #fff; box-shadow: 0px 0px 0px 0px #fff;">';
                            html += '<h2 class="title"><b>' + title.toUpperCase() + '</b></span></h2>';
                            html += '<span><b style="font-size: 16px;">Campus: </b> ' + dt.campus  + '</span>';
                            html += '<span class="date"><b>Status:</b> ' + stats  + '</span>';
                            html += '<div class="content">';
                            html += '<b>Próxima unidade:</b> <span style="color:#4a4a4a">'+obj_default[x].unidade_destino.toUpperCase()+'</span>';  
                            html += '</div>';
                            html += '<div class="content">';
                           // html += '<b>Mais informações acessando:</b> <a target="_blank" rel="noopener noreferrer" href="'+dt.link_processo+'">'+dt.link_processo+ "</a>";  
                            html += '</div>';
                            html += '</div>';
                            html += '</li>'; 
                        }
                    }
                }
            }
           /*  if(i > 0 && i < dt.length){
                html += '<li class="timeline-milestone is-current">';
            }
            if(i == dt.length){
                html += '<li class="timeline-milestone timeline-end">';
            } */
            //body

            
         /*    for(var x = 0; x < obj_default.length; x++){
                var title2 = obj_default[pos_default+1].unidade_destino;          
                html += '<div class="timeline-action">';
                html += '<h2 class="title"><b>Tipo:</b> ' + title2 + ' - <b>Campus:</b> '+  +'</b></span></h2>';
                html += '<span class="date"><b>Data de origem:</b> ' + dt.data_origem+ ' - <b>Recebido em:</b> '+ dt.recebido_em +'</span>';
                html += '<div class="content">';
                html += '<b>Unidade de destino:</b> '+dt.unidade_destino;  
                html += '<hr style="margin-top: 3px; margin-bottom:3px;">';
                html += '<b>Status:</b> '+dt.status == true ? "Terminado": "Em andamento";  
                html += '</div>';
                html += '</div>';
                html += '</li>';
            } */
                     			                 																									  									  
        //}
        html += '</ul>';
        html += '</article> '; 
        //is-future
         
    }
    document.getElementById("renderHtmlProcess").innerHTML = html;

}

function saveLast(dt){
    var typeAux = dt.tipo_auxilio.split("_").join(' ');
    var date_hour_now = '<span style="font-size:13px;">Última consulta em: <span id="rendBadgHour">'+moment().format('L') +' - '+ moment().format('LTS')+'</span> -  <b>'+typeAux.toUpperCase()+'</b> do campus <b>'+dt.campus+'</b></span>';
    document.getElementById("lastSearch").innerHTML = date_hour_now;
    localStorage.setItem('last_search', date_hour_now);
}

function errorGetProcess(_status) {
    closeLoader();
    document.getElementById("idSpinnSend").style.display = "none";
    document.getElementById("idBtnSend").style.display = "";
    UIkit.notification({ message: 'Oops: ' + _status, status: 'danger' });
    return;
}


$(document).ready(function() {
    $timelineExpandableTitle = $('.timeline-action.is-expandable .title');
    
    $($timelineExpandableTitle).attr('tabindex', '0');
    
    // Give timelines ID's
    $('.timeline').each(function(i, $timeline) {
      var $timelineActions = $($timeline).find('.timeline-action.is-expandable');
      
      $($timelineActions).each(function(j, $timelineAction) {
        var $milestoneContent = $($timelineAction).find('.content');
        
        $($milestoneContent).attr('id', 'timeline-' + i + '-milestone-content-' + j).attr('role', 'region');
        $($milestoneContent).attr('aria-expanded', $($timelineAction).hasClass('expanded'));
        
        $($timelineAction).find('.title').attr('aria-controls', 'timeline-' + i + '-milestone-content-' + j);
      });
    });
    
    $($timelineExpandableTitle).click(function() {
      $(this).parent().toggleClass('is-expanded');
      $(this).siblings('.content').attr('aria-expanded', $(this).parent().hasClass('is-expanded'));
    });
    
    // Expand or navigate back and forth between sections
    $($timelineExpandableTitle).keyup(function(e) {
      if (e.which == 13){ //Enter key pressed
        $(this).click();
      } else if (e.which == 37 ||e.which == 38) { // Left or Up
        $(this).closest('.timeline-milestone').prev('.timeline-milestone').find('.timeline-action .title').focus();
      } else if (e.which == 39 ||e.which == 40) { // Right or Down
        $(this).closest('.timeline-milestone').next('.timeline-milestone').find('.timeline-action .title').focus();
      }
    });
  });    
  
$(document).on("click", ".sendSugestion", function(e){
    e.preventDefault();
    var name_opt = document.getElementById("name_opt");
    var campus_opt = document.getElementById("select_campus_form");
    var description_opt = document.getElementById("select_textearea_form");

    if(name_opt.value.length == 0 || name_opt.value.trim() == ""){
        name_opt.value = "Anônimo";
    }
    if(campus_opt.value == 0){
        campus_opt.classList.add("uk-form-danger");
        setTimeout(function(){
            campus_opt.classList.remove("uk-form-danger"); 
        },3000)
        UIkit.notification({ message: '<span uk-icon="icon: close"></span> Selecione o seu campus.', status: 'danger' });
        return;
    }else if(description_opt.value.trim() == "" || description_opt.value.length == 0){
        description_opt.classList.add("uk-form-danger");
        setTimeout(function(){
        description_opt.classList.remove("uk-form-danger"); 
        },3000)
        UIkit.notification({ message: '<span uk-icon="icon: close"></span> É necessário preencher a mensagem.', status: 'danger' });
        return;
    }else{
        sendSugestion(name_opt.value, campus_opt.value, description_opt.value)
    }

});

function sendSugestion(name, campus, description){
    moment.locale('pt-br');
    //visitRef.push();
    var _date = moment().format('L') + " "+ moment().format('LTS');
    var resId = Date.now();
    firebase.database().ref('coments/'+resId).set({
        name: name,
        campus: campus,
        message: description,
        date_created: _date   
    }, function(error) {
        if (error) {
          // The write failed...
          UIkit.notification({ message: '<span uk-icon="icon: close"></span> Oops! Algum erro aconteceu no envio da mensagem :/.', status: 'danger' });
        return;
        } else {
        // Data saved successfully!
          document.getElementById("name_opt").value = "";
          document.getElementById("select_campus_form").value = 0;
          document.getElementById("select_textearea_form").value = ""; 
          var rp = Math.floor((Math.random() * 4) + 1);
          UIkit.modal.dialog('<div style="text-align:center"><img src="images/gato'+rp+'.png" style="width: 140px; height: 140px;margin-top: 15px;"/> <p style="font-size: 1.5rem; padding-top: 0px; margin-top: 0px;" class="uk-modal-body">Obrigado por ajudar com o crescimento do sitema!</p></div>');
        }
    });
    
};

$(document).on("click", ".speakMic", function(e){
    //document.getElementById("select_textearea_form").focus();
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.showPartial = true,
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.start();
    // This event happens when you talk in the microphone
    recognition.onresult = function(event) {
      var html = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
       //console.log(event.results[i][0].transcript.trim());
       html += event.results[i][0].transcript.trim();
       document.getElementById("select_textearea_form").value = html;
        if (event.results[i].isFinal) {
          // Here you can get the string of what you told
          document.getElementById("select_textearea_form").focus();
/*           const content = event.results[i][0].transcript.trim();

          output.textContent = content; */
        } 
      }
    };
});

function openLoader(){
    const loader = document.getElementById("id_load");
    loader.classList.add("is-active");
}

function closeLoader(){
    const loader = document.getElementById("id_load");
    loader.classList.remove("is-active");
}


/* $(document).on("click", ".gerar", function(e){
    var doc = new jsPDF();
    var elementHTML = $('#renderHtmlProcess').html();
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };
    doc.fromHTML(elementHTML, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });

    // Save the PDF
    doc.save('processos.pdf');
}); */

function insertLocalInfos(){
    const idAux = localStorage.getItem('id_auxilio');
    const idCampus = localStorage.getItem('id_campus');
    document.getElementById("saveSearch").checked = true;
    const idCampusSplit = idCampus.split("-");
    console.log(idCampus);
    document.getElementById('select_campus').value = idCampus;
    console.log("Chamou infos");    
    var urlProcess = "https://consultaprocessosipac.herokuapp.com/api/v1/processos?auxilio="+idAux+"&campus="+idCampusSplit[1];
    getFunction(urlProcess, renderProcess, errorGetProcess);
    const url = "https://consultaprocessosipac.herokuapp.com/api/v1/campus/"+idCampusSplit[0]+"/auxilios";
    document.getElementById("select_auxilio").innerHTML = '<option value="0" selected disabled>Procurando auxilios...</option>';
    getFunction(url, renderAuxilios, errorGetAuxilios);
}