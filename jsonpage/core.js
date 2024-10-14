/*
 core.js : Procesos encargados de gestionar los componentes
*/

function load_start_jsonpage(page, dom){
    var parameters = fnc_get_parameters(window.location.href, 'parameters');
    // Load render
    fnc_create_layout(page.layouts, dom);

    //Load data
    connections = page.connections;
    fnc_load_connections(parameters);

    // Load componentes
    components = page.components;
    fnc_create_components();
}

function fnc_validate_load_library(type, library, fnc_eval){

  // Validate packages load in DOM
  if (libraries_load.indexOf(library) == -1 && type_not_package.indexOf(library) == -1){
    let libraries = types_components[type].libraries[library];
    let item;

    for ( i in libraries ){
      item = fnc_load_library(libraries[i]);

      if(libraries_loaded[library] == undefined){
        libraries_loaded[library] = [];
      }

      libraries_loaded[library].push('loading');
      
      item.addEventListener('load', () => {
        libraries_loaded[library].splice(0, 1);
        if(libraries_loaded[library].length == 0){
          eval(fnc_eval);
        }
      });
    }

    libraries_load.push(library);
  }else{
    eval(fnc_eval);
  }
}

function fnc_load_library(library){
  
  var item;

  if(library.type == 'script'){
    item = document.createElement('script');
    item.setAttribute('type','text/javascript');
    item.setAttribute('src',library.source);
  }else
  if(library.type == 'css'){
    item = document.createElement('link');
    item.setAttribute('type','text/css');
    item.setAttribute('rel','stylesheet');
    item.setAttribute('href',library.source);
  }

  document.head.appendChild(item);

  return item;
}

function sleepFor( sleepDuration ){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function fnc_get_parameters(url_string, parameter) {
  var url = new URL(url_string);
  var value = url.searchParams.get(parameter);
  return value;
}

function fnc_log_fail(fnc, message){
  TypeError(fnc, message);
}