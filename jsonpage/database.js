function fnc_load_database_from_connection(table, connection, reload=false){
    if(database[table] == undefined || database.list_custom.length == 0 || reload){
        fnc_get_data(table);
        database[table] = {};
        database[table]['data'] = jQuery.extend(true, {},connections[connection].data);
    }
}

function fnc_get_filter_database(table, filters, value){
    let result = [];

    for(let i in database[table].data){
        for(let j in filters){
            if((''+database[table].data[i][filters[j]]).indexOf(value) >= 0){
                result.push(database[table].data[i]);
                break;
            }
        }
    }

    return result;
}

function fnc_set_database(table, search, search_value, change, change_value, sync=true){
    for(let i in database[table].data){
        if((''+database[table].data[i][search]) == search_value){
            database[table].data[i][change] = change_value;
            database[table].data[i]['sync'] = sync;
            break;
        }
    }
}

function fnc_set_sync_table(table, sync=true){
    database[table].sync=sync;
}

function fnc_exists_record(table, filter, value){
    let exist = false;
    for(let i in database[table].data){
        if((''+database[table].data[i][filter]) == value){
            console.log(database[table].data[i]);
            exist = true;            
            break;
        }
    }

    return exist;
}