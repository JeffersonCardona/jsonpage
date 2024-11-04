fnc_load_package_component('date');

function fnc_component_date(item){
    var component = components[item];
    var namespace = component.layout +'_date';
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == 'undefined' || component.library.length == 0 ? 'flatpickr' : component.library;
    var carryOn = fnc_carryOn_data('fnc_component_chart', item, component.configuration);

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        namespace, 
        'div',
        component['attributes']
        );

    if(carryOn == true){
        var fnc_eval = 'fnc_date_'+library+'("'+ namespace +'","'+ component.general +'")';
        fnc_validate_load_library(component.type, library, fnc_eval);
    }else{
        fnc_log_fail('fnc_component_date', 'Connection not found ' + component.configuration, item);
        fnc_render_default_component(item);
    }    
}

function fnc_date_flatpickr(namespace, connection){
    var configuration = connections[connection].data;
    $('#'+namespace).flatpickr(configuration);
}