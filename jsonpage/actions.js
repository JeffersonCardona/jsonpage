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
    
    if (load_page) {
        for(i in components){
            let component = components[i];
    
            if(types_components[component.type] != undefined){
                if(component['data'] != undefined && 
                    component['data'].length > 0 && 
                    connections[component['data']] != undefined){
                    connections[component['data']].components.push(i);
                }
    
                if(component['configuration'] != undefined && component['configuration'].length > 0){
                    connections[component['configuration']].components.push(i);
                }
    
                fnc_load_component(i);
            }else{
                fnc_log_fail('fnc_create_components', 'Type component not found', component);
            }
        }
    }    
}

function fnc_activate_components(item){
    let connection = connections[item];
    
    for(let i in connection.components){
        let component = components[connection.components[i]];
        if(types_components[component] == undefined){
            fnc_load_component(connection.components[i]);
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
