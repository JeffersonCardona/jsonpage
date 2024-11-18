var pg_status_layouts = ['status_items'];
var pg_status_close_index=undefined;

function fnc_action_items_status(process, index){
    let connection = pg_status_layouts[process];
    fnc_load_layout(connection, 'status');
    
    let value = connections[connection]['data'][index];
    components['status_list'].active = Object.keys(connections[connection]['data'].connections);
    fnc_execute_action('status_list', value);
}

function fnc_status_push(){

    let input_search = document.getElementById('status_search_custom');
    let inputHandler = function(e) {
        let db = 'customer_list';
        let cnx = 'search_list';
        let value = document.getElementById('status_search_custom').value;

        fnc_load_database_from_connection(db);
        if(value.length > 0){
            connections[cnx].data = fnc_get_filter_database(db, ['code', 'name', 'point_name'], value);
            connections[cnx].components = ['status_search_list']; 
            fnc_activate_components(cnx);
        }else{
            let html = "<div class='col-form-label col-form-label-lg' style='text-align: center;'>Digitar para ver lista</div>";
            $('#status_search_list').html(html);
            connections[cnx].data = [];
        }        
    }

    input_search.addEventListener('input', inputHandler);
    input_search.addEventListener('propertychange', inputHandler); 
}

function fnc_add_status(index){
    let cnx='status_list';
    let selected = connections['search_list'].data[index];
    let dataFormat = dateFormat("es-ES", { "hour": "2-digit", "minute": "2-digit" });

    let exist = fnc_exists_record(cnx, 'code', selected.code);

    if(exist){
        toastr['error']('El usuario ya tiene una ruta existente');
    }else{
        //item new
        
        let item = {
            "code" : selected.code,
            "icon" : "person",
            "name" : selected.name,
            "hour" : dataFormat,
            "status" : "activo",
            "class" : "icon_size_45_white icon_green " + selected.class
        }

        // add item
        database[cnx].data.unshift(item);

        fnc_load_component(cnx);
        $('#modalpushstatus').modal('hide');

        toastr['success']('La ruta ha sido creada');
    }   
}

function fnc_status_show_close(index){
    let cnx='status_list';
    let selected = connections[cnx].data[index];
    $('#modal_status_cancel_title_item').html(selected.name);
    $('#modal_status_cancel').modal('show');

    pg_status_close_index = index;
}

function fnc_pg_status_close(){
    let cnx='status_list';
    let selected = connections[cnx].data[pg_status_close_index];

    fnc_set_database(cnx, 'code', ''+selected.code, 'status', 'closed');
    fnc_set_database(cnx, 'code', ''+selected.code, 'class', connections[cnx].data[pg_status_close_index].class.replace("icon_green","icon_red"));
    fnc_set_sync_table(cnx);
    //connections[cnx].data.splice(pg_status_close_index, 1);
    delete connections.status_list.data[pg_status_close_index];
    fnc_load_component(cnx);
    $('#modal_status_cancel').modal('hide');

    toastr['success']('La ruta ha sido cerrada');

}