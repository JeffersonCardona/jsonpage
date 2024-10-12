/*
    data
        register
        columns
*/
function fnc_component_chart(item){
    var component = components[item];
    var id_div = component.layout +'_graphic';
    var title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
    const library = component.library == 'undefined' || component.library.length == 0 ? 'apexchart' : component.library;
    var carryOn = true;

    var data = connections[component.connection] == undefined ? 'null' : connections[component.connection].data;
    var configuration = connections[component.configuration] == undefined ? 'null' : connections[component.configuration].data;

    fnc_reload_html_layout(
        component.layout, 
        types_components[component.type].default_class, 
        id_div, 
        'div',
        component['attributes']
        );
    
    // Validate connection configuration
    carryOn = fnc_carryOn_data('fnc_component_chart', item, component.configuration);

    if(carryOn && fnc_carryOn_data('fnc_component_chart', item, component.connection)){
        if(carryOn == true){
            if( library == 'apexcharts'){
                fnc_chart_apexcharts(id_div, component, data, configuration);
            }else{
                fnc_chart_charts(id_div, component, data, configuration);
            }
        }
    } else{
        fnc_render_default_component(item);
    }
}

function fnc_chart_apexcharts(id_div, component, data, configuration){
    var obj_jsgrid = $.extend(configuration,{"data": data});
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
    
    var chart = new ApexCharts(document.querySelector("#"+id_div), options);
    chart.render();
}

function fnc_charts(namespace, data, configuration){
    configuration['data'] = data;
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