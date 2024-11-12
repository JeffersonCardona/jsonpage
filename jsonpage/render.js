/*
    render.js : Procesos encargado de administrar el aspecto visual

    tag -> varchar
    id -> varchar
    title -> varchar
    attributes -> object
        class
        width
        height
        ...
    sublayouts -> array
*/

function fnc_create_layout(layout, dom){
    let tmp_layout;
    for(let i in layout){
        tmp_layout = $('<'+ layout[i].tag +' id="'+ layout[i].id +'"></'+ layout[i].tag +'>');
        
        if(layout[i].attributes != undefined && Object.keys(layout[i].attributes).length > 0){
            tmp_layout.attr(layout[i].attributes);
        }

        $('#'+dom).append(tmp_layout);

        if(layout[i]['html'] != undefined && layout[i].html.length > 0){
            $('#'+layout[i].id).append(layout[i].html);
        }

        if(layout[i].sublayouts != undefined && layout[i].sublayouts.length > 0){
            fnc_create_sublayout(layout[i].id, layout[i].sublayouts);
        }
    }
}

function fnc_create_sublayout(id, sublayouts){
    let tmp_sublayout;
    for(let j in sublayouts){
        tmp_sublayout = $('<'+ sublayouts[j].tag +' id="'+ sublayouts[j].id +'"></'+ sublayouts[j].tag +'>');
        
        if(sublayouts[j].attributes != undefined && Object.keys(sublayouts[j].attributes).length > 0){
            tmp_sublayout.attr(sublayouts[j].attributes);
        }
        
        $('#'+ id).append(tmp_sublayout);

        if(sublayouts[j]['html'] != undefined && sublayouts[j].html.length > 0){
            $('#'+ sublayouts[j].id).append(sublayouts[j].html);
        }
        
        if(sublayouts[j].sublayouts != undefined && sublayouts[j].sublayouts.length > 0){
            fnc_create_sublayout(sublayouts[j].id, sublayouts[j].sublayouts);
        }
    }
}

function fnc_render_default_component(item){
    let component = components[item].component;
    let type_component = types_components[component.component];

    $('#'+component.layout).html('');
    $('#'+component.layout).addClass(type_component.default_class);
}

function fnc_reload_html_layout(namespace, default_class, id_div, tag ,attributes){
    $('#'+namespace).html('');
    $('#'+namespace).removeClass(default_class);
    $('#'+namespace).append('<'+tag+' id="'+ id_div +'"></'+tag+'>');

    if(attributes != undefined){
        $('#'+id_div).attr(attributes);
    }
}

function fnc_set_title(label, dom){
    let title = dictionary[label] == undefined ? label : dictionary[label];
    $('#'+dom).html(title);
}

// Loand JSON(layout,connection, components) in dom definite by component, active execute load component send in json load
function fnc_load_layout(connection, item){
    let component = components[item];
    let dom = component.options.dom == undefined ? 'body' : component.options.dom;
    
    $('#'+dom).html('');

    if(connections[connection]['data'].length == 0){
        fnc_get_data(connection);
        connections = Object.assign({}, connections, connections[connection]['data'].connections);
        components = Object.assign({}, components, connections[connection]['data'].components);
    }

    fnc_create_layout(connections[connection]['data'].layouts, dom);    
}

function fnc_load_component(item){
    let type = components[item].type;

    if(load_page && components_load[type]){
        eval(types_components[type].function_load+'("'+ item +'")');
    }
}

// Function with permission to add options in a tag select from connection data and field
function fnc_dom_options_select_search(cnx, field, key, dom, all=false){
    let options = [];
    let title = '';

    for(let i in database[cnx].data){
        if(!options.includes(database[cnx].data[i][field])){
            options.push(database[cnx].data[i][field]);
        }
    }

    if(all){
        title = dictionary[key+'.all'] == undefined ? 'All' : dictionary[key+'.all'];
        $('#'+dom).append('<option value="all">'+title+'</option>');
    }

    for(let i in options){
        title = dictionary[key+'.'+options[i]] == undefined ? options[i] : dictionary[key+'.'+options[i]];
        $('#'+dom).append('<option value="'+options[i]+'">'+title+'</option>');
    }
}