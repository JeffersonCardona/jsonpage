/*
    connection.js : Proceso encargado de interconectar con los servicios externos
    connection
        ajax -> boolean
        host -> varchar
        valid -> boolean
        source -> object
        parameters -> object
*/

function fnc_load_connections(){
    var connection = {};

    for( i in connections){
        fnc_load_parameters_connections(i, parameters_start);
    }

    for( i in connections ){
        connection = connections[i];
        if(connection.ajax && connection.valid){
            fnc_get_data(i);
        }
    }
}

function fnc_get_data(item){
    var connection = connections[item];
    var parameters =$.extend( connection.source, connection.parameters);
    var json = JSON.stringify(parameters);

    var request = $.ajax({
        async : false,
        method: "POST",
        url: service_balance,
        data: {
            'json' : fnc_crypto_aes(json)
        }
    });

    request.done(function(data){
        connections[item].data = data;
    });

    request.fail(function( jqXHR, textStatus ) {
        connections[item].data = {};
        fnc_log_fail('fnc_get_data', jqXHR, item);
    });
}

function fnc_validate_data(item){
    var connection = connections[item];
    var parameters = JSON.stringify(connection.parameters);

    for(i in parameters){
        if(parameters[i].length == 0){
            connections[item].valid = false;
            break;
        }
    }
}

function fnc_crypto_aes(text){
    var text_crypto = CryptoJS.AES.encrypt(text, msj_crypto);
    return text_crypto;
}

function fnc_carryOn_data(fnc, component, connection){
    var carryOn = true;

    if(connections[connection] == undefined){
        carryOn = false;
        fnc_log_fail(fnc, 'Connection not found data '+ connection + 'for component' + component);
    }else
    if(connections[connection].data.length == 0){
        carryOn = false;
        fnc_log_fail(fnc, 'Data clear ' + connection + 'for component' +  component);
    }

    return carryOn;
}