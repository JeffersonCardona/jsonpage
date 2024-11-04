
function fnc_report_active(index){

    // consultar datos


    //pasar a nueva pagina
    fnc_load_layout('lists_reports_status', 'lists_reports');

    fnc_load_components_head('fnc_load_report("'+index+'")');
}

function fnc_load_report(index){
    let label_reports = ['Reporte : Rutas', 'Reporte : Ultima semana', 'Reporte : Mes Actual', 'Reporte : Mes Anterior'];

    fnc_set_title(label_reports[index], 'title');

    fnc_get_data('graphic_config');
    fnc_load_parameters_connections('graphic_data', {});

    fnc_get_data('table_config');
    fnc_load_parameters_connections('table_data', {});
}