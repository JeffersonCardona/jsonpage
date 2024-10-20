/*
    actions.js : Procesos encargados de gestionar los procesos accionables entre los componentes.

    components:
    ID <- id unique
        layout -> varchar
        type -> varchar
        library -> varchar
        data
        configuration
        active
        options
            opt1
            opt2
            ...
*/

function fnc_create_components(){
    for(i in components){
        var component = components[i];

        if(types_components[component.type] != undefined){
            if(component['data'] != undefined && component['data'] != component['data'].length > 0){
                connections[component['data']].components.push(i);
            }

            if(component['configuration'] != undefined && component['configuration'].length > 0){
                connections[component['configuration']].components.push(i);
            }

            eval(types_components[component.type].function_load+'("'+ i +'")');
        }else{
            fnc_log_fail('fnc_create_components', 'Type component not found', component);
        }
    }
}

function fnc_activate_components(item){
    var connection = connections[item];
    
    for( i in connection.components){
        var component = components[i].component;
        if(types_components[component] == undefined){
            eval(types_components[component]+'('+ i +'');
        }else{
            fnc_log_fail('fnc_activate_components', 'Type component not found, connection ' + item, component);
        }
    }
}

function fnc_execute_action(component, value){
    let parameters = {};

    if(components[component]['parameters'] != undefined){
        for(p in components[component].parameters){
            parameters[components[component].parameters[p]] = value;
        }
    }
        
    if(components[component].data != undefined){
        parameters = $.extend(parameters, connections[components[component].data].parameters);
    }
    
    for(cnx in components[component].active){
        fnc_load_parameters_connections(components[component].active[cnx], parameters);
    }
}

function fnc_load_parameters_connections(connection, parameters){
    connections[connection].parameters = $.extend(connections[connection].parameters, parameters);

    fnc_validate_connection(connection);
    
    if(connections[connection]['valid'] == true && connections[connection]['execute'] == true){
        fnc_get_data(connection);
    }else{
        connections[connection]['data'] = [];
    }

    // Load depency connections
    for(let i in connections[connection]['components']){
        let component = components[connections[connection]['components'][i]];
        eval(types_components[component.type].function_load+'("'+ connections[connection]['components'][i] +'")');
    }
}