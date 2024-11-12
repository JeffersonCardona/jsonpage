/*
 core.js : Procesos encargados de gestionar los componentes
*/

function load_start_jsonpage(page, dom){
    var parameters = fnc_get_parameters(window.location.href, 'parameters');

    // Load components
    components = page.components;
    fnc_load_components_head('fnc_create_components()');

    // Load render
    fnc_create_layout(page.layouts, dom);

    //Load data
    connections = page.connections;
    fnc_load_connections(parameters);

    // Load componentes
    if(load_page){
      fnc_create_components()
    }

    // Load files
    fnc_load_libraries(page['libraries']);
}

function fnc_load_libraries(libraries){
  if(libraries != undefined && libraries.length > 0){
    for(let i in libraries){
      let item = fnc_load_library(libraries[i]);
    }
  }
}

function fnc_load_components_head(fnc){
  for(let i in components){
    if(components_load[components[i].type] == undefined){      
      components_load[components[i].type] = false;
      fnc_load_library(types_components[components[i].type].package, fnc);
    }
  }
}

function fnc_load_components_page(p){
  
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

function fnc_load_library(library, onload=undefined){  
  let item;

  if(library.type == 'script'){
    item = document.createElement('script');
    item.setAttribute('type','text/javascript');
    item.setAttribute('src',library.source);

    if(onload != undefined){
      item.setAttribute('onload',onload);
    }

  }else
  if(library.type == 'css'){
    item = document.createElement('link');
    item.setAttribute('type','text/css');
    item.setAttribute('rel','stylesheet');
    item.setAttribute('charset','utf-8');
    item.setAttribute('href',library.source);
  }

  document.head.appendChild(item);

  
  return item;
}

function fnc_load_package_component(type){
  components_load[type]= true;
  
  load_page = true;
  for(let i in components_load){
    if(components_load[i] == false){
      load_page = false;
      break;
    }
  }
}

function sleepFor( sleepDuration ){
  let now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function fnc_get_parameters(url_string, parameter) {
  let url = new URL(url_string);
  let value = url.searchParams.get(parameter);
  return value;
}

function fnc_log_fail(fnc, message){
  TypeError(fnc, message);
}

function dateFormat(format, options) {
  const opciones = { hour: '2-digit', minute: '2-digit' };
  let now = new Date();
  return new Intl.DateTimeFormat(format, options).format(now);
}

function fnc_execute_function(fnc){
  let f = fnc.replace(/\(.*/,'');
  if(window[f] != undefined){
    eval(fnc);
  }
}