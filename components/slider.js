/*
    data
        title
        value
        select
*/
function fnc_component_slider(item){
    var component = components[item];
    var namespace = component.layout +'_slider';
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const options = component.options != undefined ? component.options : {};
    const library = component.library == undefined ? 'glide' : component.library;
    const carryOn = fnc_carryOn_data('fnc_component_chart', item, component.data);

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        namespace, 
        'slider',
        component['attributes']
    );
    
    if(carryOn == true){
        var fnc_eval = 'fnc_slider_'+library+'("'+ namespace +'",'+ options +',"'+ component.data +'")';
        fnc_validate_load_library(component.type, library);
    }else{
        fnc_render_default_component(item);
        $('#'+ namespace).prop( 'disabled', true );
    }
}

function fnc_slider_owl(namespace, options, connection){
    options['responsive'] = connections[connection].data;
    $('#'+namespace).owlCarousel(options);
}

function fnc_slider_owl(namespace, options, connection){
    options['responsive'] = connections[connection].data;
    $('#'+namespace).owlCarousel(options);
}