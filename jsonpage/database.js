function fnc_load_database_from_connection(table, reload=false){
    if(database[table] == undefined || database[table].length == 0 || reload){
        fnc_get_data(table);
        database[table] = {};
        database[table]['data'] = jQuery.extend(true, {},connections[table].data);
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

function fnc_filter_input_select_onchange(table, input_search, select_search, filters, filter_select){
    
    let search_text = document.getElementById(input_search).value;
    let data = [];
    if(search_text.length > 0){
        data = fnc_get_filter_database(table, filters, search_text);
    }

    if(data.length == 0){
        data = jQuery.extend(true, {},database[table].data);
    }

    let r_data = [];
    search_text = document.getElementById(select_search).value;

    if(search_text != 'all'){
        for(let i in data){
            if(data[i][filter_select] == search_text){
                r_data.push(data[i]);
            }
        }
    }else{
        r_data = data;
    }
    
    connections[table].components = [table]; 
    connections[table].data = r_data;
    fnc_activate_components(table);
}