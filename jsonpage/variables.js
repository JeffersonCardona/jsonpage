/*
    variables.js : Variables globales del mecanismo
*/

// Global variable
var libraries_load = [];
var components = {};
var connections = {};
var layout = {};
const service_balance = '/jsonpage/balance.jsp';
var msj_crypto = '';
var parameters_start = [];
var dictionary = {};
var start_page = false;
var libraries_loaded = {};
var database = {'sync':{}};
const type_not_package = ["layout", "lists", "cards"];
const types_components = {
        "button" : {
                "function_load" : "fnc_component_button",
                "default_class" : "default_button",
                "libraries" : {
                        "bttncss" : [
                                {
                                        "type" : "css",
                                        "source" : "packages/bttncss/bttn.min.css"
                                }
                        ],
                        "buttons" : [
                                {
                                        "type" : "css",
                                        "source" : "packages/buttons/buttons.min.css"
                                }
                        ]
                }
        },
        "selector" : {
                "function_load" : "fnc_component_selector",
                "default_class" : "default_selector",
                "libraries" : {
                        "sumoselect" : [
                                {
                                        "type" : "script",
                                        "source" : "packages/sumoselect/sumoselect.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "packages/sumoselect/sumoselect.css"
                                }
                        ],
                        "chosen" : [
                                {
                                "type" : "script",
                                "source" : "packages/chosen/chosen.jquery.min.js"
                                },
                                {
                                "type" : "css",
                                "source" : "packages/chosen/chosen.min.css"
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
                                        "source" : "packages/flatpickr/flatpickr.min.js"
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
                                        "source" : "packages/jsgrid/jsgrid.min.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "packages/jsgrid/jsgrid.min.css"
                                }
                        ],
                        "datatable" : [
                                {
                                "type" : "script",
                                "source" : "packages/datatables/datatables.min.js"
                                },
                                {
                                "type" : "css",
                                "source" : "packages/datatables/datatables.min.css"
                                },
                                {
                                "type" : "css",
                                "source" : "packages/datatables/responsive.dataTables.min.css"
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
                                        "source" : "packages/apexchart/apexcharts.min.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "packages/apexchart/apexcharts.amd.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "packages/apexchart/apexcharts.common.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "packages/apexchart/apexcharts.esm.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "packages/apexchart/apexchart.css"
                                }
                        ],
                        "charts" : [
                                {
                                "type" : "script",
                                "source" : "packages/charts/Charts.min.js"
                                }
                        ],
                        "echarts" : [
                                {
                                "type" : "script",
                                "source" : "packages/echarts/echarts.min.js"
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
                                        "source" : "packages/sweetalert/sweetalert2.min.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "packages/sweetalert/sweetalert2.min.css"
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
                                        "source" : "packages/glide/glide.esm.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "packages/glide/glide.min.js"
                                },
                                {
                                        "type" : "script",
                                        "source" : "packages/glide/glide.modular.esm.js"
                                },
                                {
                                        "type" : "css",
                                        "source" : "packages/glide/css/glide.core.min.css"
                                },
                                {
                                        "type" : "css",
                                        "source" : "packages/glide/css/glide.theme.min.css"
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
        },
        "list" : {
                "function_load" : "fnc_component_lists",
                "default_class" : "default_list"
        }
};
