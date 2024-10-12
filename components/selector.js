/*
    data
        title
        value
        select
*/
function fnc_component_selector(item){
    var component = components[item];
    var id_item = component.layout +'_select';
    var data = connections[component.connection] == undefined ? 'null' : connections[component.connection].data;
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const options = component.options != undefined ? component.options : {};
    const library = component.library == undefined ? 'sumoselect' : component.library;

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        id_div, 
        'select',
        component['attributes']
        );
    
    if(data == 'null' || data.length == 0){
        if(data == 'null'){
            fnc_log_fail('fnc_component_selector', 'Connection not found ' + component.connection, item);
        }
        $('#'+ id_item).prop( 'disabled', true );
        $('#'+component.layout).append('<option>'+ title +'</option>');
    }else{
        for(i in data){
            $('#'+id_item).append('<option value="'+ data.value +'" select="'+ data.select +'">'+ data.title +'</option>');
        }
    }

    fnc_validate_load_library(component.type, library);

    if( library == 'chosen' ){
        fnc_select_chosen(id, options);
    }else{
        fnc_select_sumoselect(id, options);
    }
}

function fnc_select_chosen(id, options){
    $('#'+id).chosen(options);
}

function fnc_select_sumoselect(id, options){
    $('#'+id).SumoSelect(options);
}