/*
    data
        register
        columns
*/
function fnc_component_table(item){
    let component = components[item];
    let namespace = component.layout +'_table';
    let title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == undefined || component.library.length == 0 ? 'jsgrid' : component.library;
    const carryOn = fnc_carryOn_data('fnc_component_table', item, component.data);
    const carryOnCnf = fnc_carryOn_data('fnc_component_table', item, component.configuration);
    
    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        namespace, 
        'div',
        component['attributes']
    );

    if(carryOn == true && carryOnCnf == true){
        let fnc_eval = 'fnc_table_'+library+'("'+ namespace +'","'+ item +'")';
        fnc_validate_load_library(component.type, library, fnc_eval);
    } else{
        fnc_render_default_component(item);
    }
}

function fnc_table_jsgrid(namespace, item){
    let component = components[item];
    let obj_jsgrid = $.extend(connections[configuration],{"data": connections[data]});
     $("#"+namespace).jsGrid(obj_jsgrid);
}

function fnc_table_datatable(namespace, item){
    let component = components[item];
    let html = '<table id="'+namespace+'_body" class="display"></table>'
    $('#'+namespace).html(html);

    let table = $('#'+namespace+'_body').dataTable({
        columns : connections[component.configuration].data, 
        data : connections[component.data].data
        }
    );
}
