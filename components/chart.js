/*
    data
        register
        columns
*/
function fnc_component_chart(item){
    var component = components[item];
    const namespace = component.layout +'_graphic';
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == 'undefined' || component.library.length == 0 ? 'apexchart' : component.library;
    const carryOn = fnc_carryOn_data('fnc_component_chart', item, component.data);
    const carryOnCnf = fnc_carryOn_data('fnc_component_chart', item, component.configuration);

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        namespace, 
        'div',
        component['attributes']
    );
    
    if(carryOn == true &&  carryOnCnf == true){
        var fnc_eval = 'fnc_chart_'+library+'("'+ namespace +'","'+ item +'")';
        fnc_validate_load_library(component.type, library, fnc_eval);
    }else{
        fnc_render_default_component(item);
    }
}

function fnc_chart_apexcharts(namespace, item){
    var component = components[item];
    var obj_jsgrid = $.extend(connections[components.configuration],{"data": connections[components.data].data});
    var options = eval(configuration.configuration);
    var categories =  fnc_get_info_categories(data, options.column_category);
    var series_data =  fnc_get_info_datas(data, options.columns_series);
    
    if(options.chart.type == 'pie'){
        options.labels = categories;
        options.series = series_data[options.columns_series[0]];
    }else{
        options.xaxis.categories = categories;
        
        for(i in options.series){
            options.series[i].data = series_data[options.series[i].name];
            options.series[i].name = dictionary[options.series[i].name] == undefined ? options.series[i].name : dictionary[options.series[i].name];
        }
    }
    
    var chart = new ApexCharts(document.querySelector("#"+namespace), options);
    chart.render();
}

function fnc_chart_charts(namespace, item){
    var component = components[item];
    var configuration = $.extend(connections[components.configuration],{"data": connections[components.data].data});
    var cnx = $('#'+namespace);
    new Chart(cnx, configuration);
}

function fnc_get_info_categories(data, column){
    var categories = [];
    for(i in data){
        if(categories.indexOf(data[i][column]) == -1){
            categories.push(data[i][column]);
        }
    }
    return categories;
}

function fnc_get_info_series(data, columns){
    var series = {};
    for(i in data){
        for(j in columns){
            if(series.indexOf(data[i][columns[j]]) == -1){
                series.push(data[i][columns[j]]);
            }
        }
    }
    return series;
}