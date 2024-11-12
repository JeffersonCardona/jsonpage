let cnx_customer='customer_list';
let pg_customer_disabled_index = 0;

function fnc_customer_load_select_options(){
    fnc_dom_options_select_search('customer_list', 'city', 'city', 'customer_search_select_body', true);
}

function fnc_customer_disabled(index){
    let selected = connections[cnx_customer].data[index];
    $('#modal_customer_disabled_title_item').html(selected.name);
    $('#modal_customer_disabled_point').html(selected.point_name);
    $('#modal_customer_disabled').modal('show');

    pg_customer_disabled_index = index;
}

function fnc_pg_customer_disabled(){
    let value = document.getElementById('modal_customer_disabled_textarea').value;
    
    if(value.length == 0 ){
        toastr['error']('Debe incluir una observacion para desactivar el cliente');
    }else{
        
    }
}

fnc_customer_load_select_options();