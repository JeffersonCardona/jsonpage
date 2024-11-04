fnc_load_package_component('button');

/*
    data
    title
    value
    select
*/
function fnc_component_button(item){
    let component = components[item];
    let data = component.data == undefined ?  [] : connections[component.data].data;
    const namespace = component.layout +'_button';
    const title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == undefined || component.library.length == 0 ? 'buttons' : component.library;
    const display = component.display == undefined || component.display.length == 0 ? 'buttons' : component.display;
    let carryOn = fnc_carryOn_data('fnc_component_button', item, component.data);
    let tag = 'button';
    let default_class = types_components[component.type].default_class;

    if(display == 'material'){
        tag = 'div';
        default_class = '';
    }

    fnc_reload_html_layout(
        component.layout, 
        default_class, 
        namespace, 
        tag,
        component['attributes']
    );

    if(display == 'material'){
        let btn_i = '<i class="icon material-icons if-md py-2 d-none d-md-inline-block" title="'+ title +'" style="cursor: pointer;" >'+ component.options.icon +'</i>';
        $('#'+namespace).append(btn_i); 
    }else  
    if( title.length > 0 ){
        $('#'+namespace).html(title);
    }  

    if(carryOn == true){
        $('#'+namespace).prop( 'disabled', false );
    }else{
        $('#'+namespace).prop( 'disabled', true );
    }    

    $( '#'+namespace ).on( "click", function() {
        let fnc_eval = 'fnc_action_'+library+'("'+ namespace +'","'+ item +'","'+ component.data +'", '+carryOn+')';
        fnc_validate_load_library(component.type, library, fnc_eval);
    } );
}

function fnc_action_default(namespace, item, data, carryOn){
    let component = components[item];
    let value = component.options.value == undefined ? 'valid' : component.options.value;

    fnc_execute_action(item, value);
}

function fnc_action_layout(namespace, item, data, carryOn){
    let component = components[item];
    let dom = component.options.dom == undefined ? 'body' : component.options.dom;
    let value = component.options.value == undefined ? 'valid' : component.options.value;

    $('#'+dom).html('');    

    if(connections, connections[component.data]['data'].length == 0){
        fnc_get_data(component.data);
        connections = Object.assign({}, connections, connections[component.data]['data'].connections);
        components = Object.assign({}, components, connections[component.data]['data'].components);
    }

    fnc_create_layout(connections[component.data]['data'].layouts, dom);
    components[item].active = Object.keys(connections[component.data]['data'].connections);

    fnc_load_components_head('fnc_execute_action("'+item+'", "'+value+'")');
    fnc_execute_action(item, value);
}