/*
    connection.js : Proceso encargado de interconectar con los servicios externos
    connection
        execute -> boolean
        host -> varchar
        valid -> boolean
        base -> object
        parameters -> object
        data -> object
*/

function fnc_load_connections(parameters = {}){
    for( cnx in connections ){
        connections[cnx]['components'] = [];
        connections[cnx].parameters = $.extend(connections[cnx].parameters, parameters);
        fnc_validate_connection(cnx);

        if(connections[cnx].execute && connections[cnx].valid){
            fnc_get_data(cnx);
        }
    }
}

function fnc_get_data(cnx){
    let parameters = $.extend( connections[cnx].base, connections[cnx].parameters);
    let json = '';
    
    if(Object.keys(parameters).length){
        json = fnc_crypto_aes(JSON.stringify(parameters));
    }

    var request = $.ajax({
        async : false,
        method: "POST",
        url: service_balance,
        data: {
            'host' : connections[cnx].host,
            'json' : json
        }
    });

    request.done(function(data){
        connections[cnx]['data'] = data;
    });

    request.fail(function( jqXHR, textStatus ) {
        connections[cnx]['data'] = {};
        fnc_log_fail('fnc_get_data', jqXHR, cnx);
    });
}

function fnc_validate_connection(connection){
    let parameters = connections[connection].parameters;
    connections[connection]['valid'] = true;

    for(p in parameters){
        if(parameters[p] === null || parameters[p].length == 0){
            connections[connection]['valid'] = false;
            break;
        }
    }
}

function fnc_crypto_aes(text){
    let encrypted = CryptoJS.AES.encrypt(text, msj_crypto);
    return encrypted.toString();
}

function fnc_carryOn_data(fnc, component, connection){
    var carryOn = true;

    if(connections[connection] == undefined){
        carryOn = false;
        fnc_log_fail(fnc, 'Connection not found data '+ connection + 'for component' + component);
    }else
    if(connections[connection].valid == true && connections[connection].execute == false){
        carryOn = true;
    }
    else
    if(connections[connection].data.length == 0){
        carryOn = false;
        fnc_log_fail(fnc, 'Data clear ' + connection + 'for component' +  component);
    }

    return carryOn;
}