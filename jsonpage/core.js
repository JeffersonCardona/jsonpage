/*
 core.js : Procesos encargados de gestionar los componentes

 ID <- id unique
    layout -> varchar
    type -> varchar
    library -> varchar
    connections
        configuration
        general
    attributes
        class
        height
        width
        ...
    options
        opt1
        opt2
        ...
*/

function load_start_jsonpage(){
    // Load render
    fnc_create_layout(page.layouts);

    //Load data
    fnc_load_connections(page.connections);

    // Load componentes
    fnc_create_components(page.components);
}

function fnc_create_components(){
    for(i in components){
        var component = components[i];

        if(types_components[component.type] == undefined){
          eval(types_components[component].function_load+'('+ i +'');
        }else{
            fnc_log_fail('fnc_create_components', 'Type component not found', component);
        }
    }
}

function fnc_validate_load_library(type, library){
  // Validate packages load in DOM
  if (libraries_load.indexOf(library) == -1){
    fnc_load_packages(type,library);
  }
}

function fnc_load_library(type, library){

  let libraries = types_components[type].libraries[library];

  for ( i in libraries ){
    var item;

    if(libraries[i].type == 'script'){
      item = document.createElement('script');
      item.type = 'text/javascript';
      item.src = libraries[i].source;
    }else
    if(libraries[i].type == 'css'){
      item = document.createElement('link');
      item.type = 'text/css';
      item.rel = 'stylesheet';
      item.href = libraries[i].source;
    }

    document.getElementsByTagName("head").appendChild(item);
  }

  libraries_load.push(type);
}

function fnc_log_fail(fnc, message){
    console.error(fnc, message);
}
