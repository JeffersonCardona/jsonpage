function fnc_component_popup(item, data=undefined){
    if( data != undefined){
        Swal.fire(data);
    }else
    if(fnc_carryOn_data('fnc_component_popup', item, component.connection)){
        var component = components[item];
        var id_div = component.layout +'_popup';
        var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
        
        fnc_reload_html_layout(
            component.layout, 
            types_components[component.type].default_class, 
            id_div, 
            'div',
            component['attributes']
            );

        Swal.fire(component.connection['data']);
    }
}