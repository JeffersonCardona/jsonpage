/*
    data
        register
        columns
*/
function fnc_component_table(item){
    var component = components[item];
    var id_div = component.layout +'_table';
    var data = connections[component.connection] == undefined ? 'null' : connections[component.connection].data;
    var configuration = connections[component.configuration] == undefined ? 'null' : connections[component.configuration].data;
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == undefined || component.library.length == 0 ? 'jsgrid' : component.library;
    var carryOn = true;
    
    fnc_reload_html_layout(
            component.layout, 
            types_components[component.type].default_class, 
            id_div, 
            'div',
            component['attributes']
            );

    // Validate connection configuration
    carryOn = fnc_carryOn_data('fnc_component_table', item, component.configuration);

    if(carryOn && fnc_carryOn_data('fnc_component_table', item, component.connection)){
        if(carryOn == true){
            if( library == 'jsgrid'){
                fnc_table_jsgrid(id_div, component, data, configuration);
            }else{
                fnc_table_datatable(id_div, component, data, configuration);
            }
        }
    } else{
        fnc_render_default_component(item);
    }
}

function fnc_table_jsgrid(id, component, data, configuration){
    var obj_jsgrid = $.extend(configuration,{"data": data});
     $("#"+id).jsGrid(obj_jsgrid);
}

function fnc_table_datatable(id, component, data, configuration){
    var obj_jsgrid = $.extend(configuration,{"data": data});
     $("#"+id).DataTable(obj_jsgrid);
}
