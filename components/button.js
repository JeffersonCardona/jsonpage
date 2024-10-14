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
    let carryOn = fnc_carryOn_data('fnc_component_button', item, component.data);
    let tag = 'button';
    let default_class = types_components[component.type].default_class;

    if(library == 'material'){
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
    
    if( title.length > 0 ){
        $('#'+namespace).html(title);
    }  

    let fnc_eval = 'fnc_button_'+library+'("'+ namespace +'","'+ item +'","'+ component.data +'", '+carryOn+')';
    fnc_validate_load_library(component.type, library, fnc_eval);

    if(carryOn == true){
        $('#'+namespace).prop( 'disabled', false );
    }else{
        $('#'+namespace).prop( 'disabled', true );
    }    

    fnc_execute_action(item, '');
}

function fnc_button_bttncss(namespace, component, data, carryOn){
    if(carryOn == false){
        $('#'+namespace).addClass('bttn-no-outline');
    }
}

function fnc_button_buttons(namespace, component, data, carryOn){
    
}

function fnc_button_material(namespace, item, data, carryOn){
    let component = components[item];
    let title = '';

    if(component.options.title != undefined){
        title = dictionary[component.options.title] == undefined ? component.options.title : dictionary[component.options.title];
    }

    let btn_i = '<i class="icon material-icons if-md py-2 d-none d-md-inline-block" title="'+ title +'" style="cursor: pointer;" >'+ component.options.icon +'</i>';
    $('#'+namespace).append(btn_i);
}