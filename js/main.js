window.onload = function () {
    moment.locale('pt-br'); 
     
    //getFunction(urlPerStatePb, renderState, errorGet);
    //getFunction(urlPerCityJp, renderCity, errorGet);
}

$(document).on("click", ".send", function(e){
    console.log("Click send");
    var auxilio = document.getElementById("select_auxilio");
    var campus = document.getElementById("select_campus");

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
        var html = '<span class="uk-flex uk-flex-center" uk-spinner="ratio: 4.5"></span>';
        document.getElementById("renderHtmlProcess").innerHTML = html;

        //renderProcess(_dt)
        getFunction(auxilio.value, campus.value, renderProcess, errorGetProcess);
    }

    e.preventDefault();
    e.stopImmediatePropagation();
})

function getFunction(auxilio, campus, cbSuccess, cbError) {
    console.log("Chamou func");
    var xmlHttp = new XMLHttpRequest();
    var theUrl = "https://consultaprocessosipac.herokuapp.com/api/v1/processos?auxilio="+auxilio+"&campus="+campus;

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            cbSuccess(xmlHttp.responseText);
        } else if (xmlHttp.status == 500) {
            cbError(xmlHttp.status);
        } else if (xmlHttp.status == 404) {
            cbError(xmlHttp.status);
        }

    }
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    //xmlHttp.timeout = 15000;
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlHttp.getResponseHeader('Content-Type');
    xmlHttp.onprogress = updateProgress;
    xmlHttp.send(null);



    xmlHttp.onerror = function (status) {
        alert("Request failed: " + status);
    };
}

function updateProgress(evt) {
    if (evt.lengthComputable) {  // evt.loaded the bytes the browser received
        // evt.total the total bytes set by the header
        // jQuery UI progress bar to show the progress on screen
        var percentComplete = (evt.loaded / evt.total) * 100;
        console.log(percentComplete);
        //$('#progressbar').progressbar("option", "value", percentComplete);
    }
}

function renderProcess(res) {
    console.log(res);
    var resPars = JSON.parse(res);
    var dt = resPars.data;
    console.log(dt);
    console.log(dt.length);
    document.getElementById("renderHtmlProcess").innerHTML = "";
    var date_hour_now = 'Última pesquisa em: <span class="uk-badge" id="rendBadgHour">'+moment().format('L') +' - '+ moment().format('LTS')+'</span>';
    document.getElementById("lastSearch").innerHTML = date_hour_now;
    if (dt.length == 0) {
        document.getElementById("renderHtmlProcess").innerHTML = "<span style='text-align:center'><h3>Oops!</h3> Nenhum processo encontrado no momento.</span>";
        errorGetProcess("Nenhum processo encontrado no momento.");
    } else {       
        var html = "";
        html += '<article style="margin-top: 20px;" class="page">';
        html += '<h2>Resultados - Atualizado em ' + moment(dt[0].atualizado_em).format('LLL') + '</h2>';
        html += '<ul class="timeline">';
        for(var i = 0; i < dt.length; i++){           			
            if(i == 0){
                html += '<li class="timeline-milestone is-completed timeline-start">';              
            }
             if(i > 0 && i < dt.length){
                html += '<li class="timeline-milestone is-current">';
            }
             if(i == dt.length){
                html += '<li class="timeline-milestone timeline-end">';
            }
            //body
            var title = dt[i].tipo_auxilio.replace("_", " ");          
            html += '<div class="timeline-action">';
            html += '<h2 class="title"><b>Tipo:</b> ' + title.charAt(0).toUpperCase() + title.slice(1) + ' - <b>Campus:</b> '+ dt[i].campus +'</b></span></h2>';
            html += '<span class="date"><b>Data de origem:</b> ' + dt[i].data_origem+ ' - <b>Recebido em:</b> '+ dt[i].recebido_em +'</span>';
            html += '<div class="content">';
            html += '<b>Unidade de origem:</b> ' + dt[i].unidade_origem;
            html += '<hr style="margin-top: 3px; margin-bottom:3px;">';
            html += '<b>Unidade de destino:</b> '+dt[i].unidade_destino;  
            html += '</div>';
            html += '</div>';
            html += '</li>';   
                     			                 																									  									  
        }
        html += '</ul>';
        html += '</article> '; 

        document.getElementById("renderHtmlProcess").innerHTML = html; 
    }

}

function errorGetProcess(_status) {
    document.getElementById("renderHtmlProcess").innerHTML = "";
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