fnc_load_package_component('selector');

/*
    data
    title
    value
    select
*/
function fnc_component_selector(item){
    let component = components[item];
    let data = connections[component.data].data;
    const namespace = component.layout +'_select';
    const title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == undefined || component.library.length == 0 ? 'sumoselect' : component.library;
    let carryOn = fnc_carryOn_data('fnc_component_selector', item, component.data);

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        namespace, 
        'select',
        component['attributes']
    );

    if(carryOn == true && data.length > 0){
        let fnc_eval = 'fnc_select_'+library+'("'+ namespace +'","'+ item +'","'+ component.data +'")';
        fnc_validate_load_library(component.type, library, fnc_eval);
    }else{
        $('#'+namespace).prop( 'disabled', true );
        $('#'+namespace).append('<option value="" select="true">'+ title +'</option>');
    }

    fnc_execute_action(item, $('#'+namespace).val());
}

function fnc_select_chosen(namespace, component, connection){
    let data = connections[connection].data;
    const options = components[component].options != undefined ? components[component].options : {};

    for(i in data){
        $('#'+namespace).append('<option value="'+ data[i].value +'" select="'+ data[i].select +'">'+ data[i].title +'</option>');
    }
    
    $('#'+namespace).chosen(options).change(function(){
        fnc_execute_action(component, $('#'+namespace).val());
    });

}

function fnc_select_sumoselect(namespace, component, connection){
    let data = connections[connection].data;
    const options = components[component].options != undefined ? components[component].options : {};
    
    for(i in data){
        $('#'+namespace).append('<option value="'+ data[i].value +'" select="'+ data[i].select +'">'+ data[i].title +'</option>');
    }

    $('#'+namespace).SumoSelect(options);

    $('#'+namespace).change(function() {
        fnc_execute_action(component, $('#'+namespace).val());
    });

}

