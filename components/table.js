/*
    data
        register
        columns
*/
function fnc_component_table(item){
    var component = components[item];
    var namespace = component.layout +'_table';
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
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
        var fnc_eval = 'fnc_table_'+library+'("'+ namespace +'","'+ component.general +'","'+ component.configuration +'")';
        fnc_validate_load_library(component.type, library, fnc_eval);
    } else{
        fnc_render_default_component(item);
    }
}

function fnc_table_jsgrid(namespace, component, data, configuration){
    var obj_jsgrid = $.extend(connections[configuration],{"data": connections[data]});
     $("#"+namespace).jsGrid(obj_jsgrid);
}

function fnc_table_datatable(namespace, component, data, configuration){
    var obj_jsgrid = $.extend(connections[configuration],{"data": connections[data]});
     $("#"+namespace).DataTable(obj_jsgrid);
}
