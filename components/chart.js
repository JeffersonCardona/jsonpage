/*
    data
        register
        columns
*/

fnc_load_package_component('chart');

function fnc_component_chart(item){
    let component = components[item];
    const namespace = component.layout +'_graphic';
    let title = dictionary[component.title] == undefined ? component.title : dictionary[component.title];
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

    if(carryOn && carryOnCnf){
        let fnc_eval = 'fnc_chart_'+library+'("'+ namespace +'","'+ item +'")';
        fnc_validate_load_library(component.type, library, fnc_eval);
    }else{
        fnc_render_default_component(item);
    }
}

function fnc_chart_apexcharts(namespace, item){
    let component = components[item];
    let obj_jsgrid = $.extend(connections[component.configuration],{"data": connections[component.data].data});
    let options = eval(configuration.configuration);
    let categories =  fnc_get_info_categories(data, options.column_category);
    let series_data =  fnc_get_info_datas(data, options.columns_series);
    
    if(options.chart.type == 'pie'){
        options.labels = categories;
        options.series = series_data[options.columns_series[0]];
    }else{
        options.xaxis.categories = categories;
        
        for(let i in options.series){
            options.series[i].data = series_data[options.series[i].name];
            options.series[i].name = dictionary[options.series[i].name] == undefined ? options.series[i].name : dictionary[options.series[i].name];
        }
    }
    
    let chart = new ApexCharts(document.querySelector("#"+namespace), options);
    chart.render();
}

function fnc_chart_charts(namespace, item){
    let component = components[item];
    let configuration = $.extend(connections[component.configuration],{"data": connections[component.data].data});
    let cnx = $('#'+namespace);
    new Chart(cnx, configuration);
}

function fnc_chart_echarts(namespace, item){
    let component = components[item];
    let height = component.options.height == undefined ? "300px" : component.options.height;
    let options = $.extend({},connections[component.configuration].data);
    let data = connections[component.data].data;

    //load axis data
    if(options['xAxis'] != undefined || options['radiusAxis'] != undefined){
        let axis = options['xAxis'] != undefined ? 'xAxis' : 'radiusAxis';
        for(let i in options[axis]){
            for(let j in data){
                if( data[j].name == options[axis][i].type){
                    options[axis][i].data = data[j].values;
                    break;
                }
            }
        }
    }

    //load data in series
    for(let i in options.series){
        for(let j in data){
            if(options.series[i].name == data[j].name){
                options.series[i].data = data[j].values;
                break;
            }
        }
    }

    let dom_echarts = document.getElementById(namespace);
    document.getElementById(namespace).style.height = height;

    let chart = echarts.init(dom_echarts, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });

    chart.clear();
    chart.setOption(options);
    window.addEventListener('resize', chart.resize);
}

function fnc_get_info_categories(data, column){
    let categories = [];
    for(i in data){
        if(categories.indexOf(data[i][column]) == -1){
            categories.push(data[i][column]);
        }
    }
    return categories;
}

function fnc_get_info_series(data, columns){
    let series = {};
    for(let i in data){
        for(let j in columns){
            if(series.indexOf(data[i][columns[j]]) == -1){
                series.push(data[i][columns[j]]);
            }
        }
    }
    return series;
}