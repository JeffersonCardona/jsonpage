/*
    actions.js : Procesos encargads de gestionar los procesos accionables entre los componentes.
*/

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

function fnc_load_parameters_connections(item, parameters){
    connections[item].parameters = $.extend( connections[i].parameters, parameters );
}