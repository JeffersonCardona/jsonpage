fnc_load_package_component('lists');

function fnc_component_lists(item){
    let component = components[item];
    let data = component.data == undefined ?  [] : connections[component.data].data;
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
    let data = connections[connection].data;
    let template = component.options.template == undefined ? 'label' : component.options.template;
    $('#'+namespace).append('<ol id="'+namespace+'_ol" class="list-group list-group-numbered"></ol>');

    for(let i in data){
        let row = '<li class="list-group-item">'+ template +'</li>';
        for(let j in data[i]){
            row.replace('$'+j, data[i][j]);
        } 
        $('#'+namespace+'_ol').append(row);
    }

}

function fnc_lists_cards(namespace, item, connection, carryOn){
    let component = components[item];
    let data = connections[connection].data;
    let template = component.options.template == undefined ? 'label' : component.options.template;

    for(let i in data){
        let row = "<div class='card' style='margin: 5px;' id='row_list_"+i+"'>"+ template +"</div>";
        row = row.replaceAll("$index", i);

        for(let j in data[i]){
            row = row.replaceAll("$"+j, data[i][j]);
        } 
        
        $('#'+namespace).append(row);
    }

}