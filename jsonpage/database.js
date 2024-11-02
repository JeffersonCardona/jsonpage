function fnc_load_database_from_connection(table, connection, reload=false){
    if(database[table] == undefined || database.list_custom.length == 0 || reload){
        fnc_get_data(table);
        database[table] = Object.assign({},connections[connection].data);
    }
}

function fnc_get_filter_database(table, filters, value){
    let result = [];

    for(let i in database[table]){
        for(let j in filters){
            if((''+database[table][i][filters[j]]).indexOf(value) >= 0){
                result.push(database[table][i]);
                break;
            }
        }
    }

    return result;
}

function fnc_set_database(table, search, search_value, change, change_value, sync=true){
    for(let i in database[table]){
        if((''+database[table][i][search]).indexOf(search_value) >= 0){
            database[table][i][change] = change_value;
            database[table][i]['sync'] = sync;
            break;
        }
    }
}

function fnc_set_sync_table(table, sync=true){
    database.sync[table]=sync;
}