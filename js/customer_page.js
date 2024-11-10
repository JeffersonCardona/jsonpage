function fnc_customer_load_select_options(){
    fnc_dom_options_select_search('customer_list', 'city', 'city', 'customer_search_select_body', true);
}

fnc_get_data('customer_list');
