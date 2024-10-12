function fnc_component_date(item){
    var component = components[item];
    var id_div = component.layout +'_date';
    var configuration = connections[component.configuration] == undefined ? 'null' : connections[component.connection].data;
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == 'undefined' || component.library.length == 0 ? 'flatpickr' : component.library;
    
    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        id_div, 
        'div',
        component['attributes']
        );

    if(configuration == 'null'){
        fnc_log_fail('fnc_component_date', 'Connection not found ' + component.configuration, item);
    }else{
        $('#'+component.layout).append(div_date);
        fnc_validate_load_library(component.type, library);

        if( component.library == 'flatpickr'){
            fnc_date_flatpickr(id_div, component, configuration);
        }
    }    
}

function fnc_date_flatpickr(id, configuration){
    $('#'+id).flatpickr(configuration);
}