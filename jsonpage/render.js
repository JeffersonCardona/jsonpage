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
    var tmp_layout;
    for(i in layout){
        tmp_layout = $('<'+ layout[i].tag +' id="'+ layout[i].id +'"></'+ layout[i].tag +'>');
        if(layout[i].attributes != undefined && Object.keys(layout[i].attributes).length > 0){
            tmp_layout.attr(layout[i].attributes);
        }

        $('#'+dom).append(tmp_layout);

        if(layout[i].sublayouts != undefined && layout[i].sublayouts.length > 0){
            fnc_create_sublayout(layout[i].id, layout[i].sublayouts);
        }
    }
}

function fnc_create_sublayout(id, sublayouts){
    var tmp_sublayout;
    for(j in sublayouts){
        tmp_sublayout = $('<'+ sublayouts[j].tag +' id="'+ sublayouts[j].id +'"></'+ sublayouts[j].tag +'>');
        
        if(sublayouts[j].attributes != undefined && Object.keys(sublayouts[j].attributes).length > 0){
            tmp_sublayout.attr(sublayouts[j].attributes);
        }
        
        $('#'+ id).append(tmp_sublayout);
        
        if(sublayouts[j].sublayouts != undefined && sublayouts[j].sublayouts.length > 0){
            fnc_create_sublayout(sublayouts[j].id, sublayouts[j].sublayouts);
        }
    }
}

function fnc_render_default_component(item){
    var component = components[item].component;
    var type_component = types_components[component.component];

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