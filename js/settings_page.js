let cnx_settings='info_details';

function fnc_settings_load_info(){
    $('#user_email').html(connections.info_details.data.email);
    $('#user_phone').html(connections.info_details.data.phone);
}

fnc_settings_load_info()