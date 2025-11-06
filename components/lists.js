fnc_load_package_component('lists');

function fnc_component_lists(item){
    let component = components[item];
    const namespace = component.layout +'_list';
    const library = component.library == undefined ? 'default' : component.library;
    let carryOn = fnc_carryOn_data('fnc_component_button', item, component.data);
    
    fnc_reload_html_layout(
        component.layout, 
        '', 
        namespace, 
        'div',
        component['attributes']
    );

    let fnc_eval = 'fnc_lists_'+library+'("'+ namespace +'","'+ item +'","'+ component.data +'", '+carryOn+')';
    fnc_validate_load_library(component.type, library, fnc_eval);

    if(carryOn == true){
        $('#'+namespace).prop( 'disabled', false );
    }else{
        $('#'+namespace).prop( 'disabled', true );
    }
}

function fnc_lists_default(namespace, item, connection, carryOn){
    let component = components[item];
    let data = fnc_get_data_component(connection);
    let template = component.options.template == undefined ? 'label' : component.options.template;
    let numbered = component.options.numbered == true ? 'list-group-numbered' : '';
    $('#'+namespace).append('<ul id="'+namespace+'_ol" class="list-group '+numbered+'"></ul>');

    for(let i in data){
        let row = '<li class="list-group-item">'+ fnc_list_replace_keys(template, data[i], i) +'</li>';
        $('#'+namespace+'_ol').append(row);
    }

}

function fnc_lists_cards(namespace, item, connection, carryOn){
    let component = components[item];
    let data = fnc_get_data_component(connection);
    let template = component.options.template == undefined ? 'label' : component.options.template;

    for(let i in data){
        let row = "<div class='card' style='margin: 5px;' id='row_list_"+i+"'>"+ fnc_list_replace_keys(template, data[i], i) +"</div>"; 
        $('#'+namespace).append(row);
    }

}

function fnc_list_replace_keys(template, keys, index){
    let return_row = template;    

    for(let j in keys){
        return_row = return_row.replaceAll("$"+j, keys[j]);
    }
    
    return_row = return_row.replaceAll("$index", index);

    return return_row;
    
}
