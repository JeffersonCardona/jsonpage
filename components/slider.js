/*
    data
        title
        value
        select
*/
function fnc_component_slider(item){
    var component = components[item];
    var id_item = component.layout +'_slider';
    var data = connections[component.connection] == undefined ? 'null' : connections[component.connection].data;
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const options = component.options != undefined ? component.options : {};
    const library = component.library == undefined ? 'glide' : component.library;

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        id_div, 
        'slider',
        component['attributes']
        );
    
    if(data == 'null' || data.length == 0){
        if(data == 'null'){
            fnc_log_fail('fnc_component_slider', 'Connection not found ' + component.connection, item);
        }
        $('#'+ id_item).prop( 'disabled', true );
    }

    fnc_validate_load_library(component.type, library);

    if( library == 'owl' ){
        fnc_slider_owl(id, options, data);
    }else{
        fnc_slider_glide(id, options, data);
    }
}

function fnc_slider_owl(id, options, data){
    options['responsive'] = data;
    $('#'+id).owlCarousel(options);
}

function fnc_slider_owl(id, options){
    options['responsive'] = data;
    $('#'+id).owlCarousel(options);
}