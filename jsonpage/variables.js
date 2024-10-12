/*
    variables.js : Variables globales del mecanismo
*/

// Global variable
var libraries_load = [];
var components = {};
var connections = {};
var layout = {};
const service_balance = 'jsonpage/balance.jsp';
var msj_crypto = '';
var parameters_start = [];
var dictionary = {};
var start_page = false;
const types_components = {
        "selector" : {
                "function_load" : "fnc_component_selector",
                "default_class" : "default_selector",
                "libraries" : {
                        "sumoselect" : [
                                {
                                        "type" : "script",
                                        "source" : "sumoselect/sumoselect.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "sumoselect/sumoselect.css"
                                }
                        ],
                        "chosen" : [
                                {
                                "type" : "script",
                                "source" : "chosen/chosen.proto.min.js"
                                },
                                {
                                "type" : "css",
                                "source" : "chosen/chosen.min.css"
                                }
                        ]
                }
        },
        "date " :{
                "function_load" : "fnc_component_date",
                "default_class" : "default_date",
                "libraries" : {
                        "flatpickr" : [
                                {
                                        "type" : "script",
                                        "source" : "flatpickr/flatpickr.min.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "flatpickr/flatpickr.min.css"
                                }
                        ]
                }
        },
        "table" : {
                "function_load" : "fnc_component_table",
                "default_class" : "default_table",
                "libraries" : {
                        "jsgrid" : [
                                {
                                        "type" : "script",
                                        "source" : "jsgrid/jsgrid.min.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "jsgrid/jsgrid.min.css"
                                }
                        ],
                        "datatable" : [
                                {
                                "type" : "script",
                                "source" : "datatables/datatables.min.js"
                                },
                                {
                                "type" : "css",
                                "source" : "datatables/datatables.min.css"
                                }
                        ]
                }
        },
        "chart" : {
                "function_load" : "fnc_component_chart",
                "default_class" : "default_generic",
                "libraries" : {
                        "apexcharts" : [
                                {
                                        "type" : "script",
                                        "source" : "apexchart/apexcharts.min.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "apexchart/apexcharts.amd.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "apexchart/apexcharts.common.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "apexchart/apexcharts.esm.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "apexchart/apexchart.css"
                                }
                        ],
                        "charts" : [
                                {
                                "type" : "script",
                                "source" : "charts/charts.min.js"
                                }
                        ],
                        "echarts" : [
                                {
                                "type" : "script",
                                "source" : "echarts/echarts.min.js"
                                }
                        ]
                }
        },
        "popup" : {
                "function_load" : "fnc_component_popup",
                "default_class" : "",
                "libraries" : {
                        "sweetalert" : [ 
                                {
                                        "type" : "script",
                                        "source" : "sweetalert/sweetalert.min.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "sweetalert/sweetalert.min.css"
                                }
                        ]
                }
        },
        "slider" : {
                "function_load" : "fnc_component_slider",
                "default_class" : "default_generic",
                "libraries" : {
                        "glide" : [
                                {
                                        "type" : "script",
                                        "source" : "glide/glide.esm.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "glide/glide.min.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "glide/glide.modular.esm.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "glide/css/glide.core.min.css"
                                },
                                {
                                        "type" : "css",
                                        "source" : "glide/css/glide.theme.min.css"
                                }
                        ]
                }
        },
    "editor" : {
            "function_load" : "fnc_component_edit",
            "default_class" : "default_generic"
            },
    "upload" : {
            "function_load" : "fnc_component_upload",
            "default_class" : "default_upload"
            }
};