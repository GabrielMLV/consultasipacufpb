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