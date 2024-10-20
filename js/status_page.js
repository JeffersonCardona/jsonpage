var pg_status_layouts = ['status_items'];

function fnc_action_items_status(process, index){
    fnc_load_layout(pg_status_layouts[process], index);
}

function fnc_load_layout(connection, index){
    let component = components['status'];
    let dom = component.options.dom == undefined ? 'body' : component.options.dom;
    let value = connections[connection]['data'][index];

    $('#'+dom).html('');

    if(connections[connection]['data'].length == 0){
        fnc_get_data(connection);
        connections = Object.assign({}, connections, connections[connection]['data'].connections);
        components = Object.assign({}, components, connections[connection]['data'].components);
    }

    fnc_create_layout(connections[connection]['data'].layouts, dom);
    components['status_list'].active = Object.keys(connections[connection]['data'].connections);
    fnc_execute_action('status_list', value);
}

