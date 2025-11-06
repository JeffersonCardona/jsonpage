<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.net.http.HttpClient" %>
<%@ page import="java.net.http.HttpRequest" %>
<%@ page import="java.net.http.HttpResponse" %>
<%@ page import="java.net.URI" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="com.fasterxml.jackson.core.type.TypeReference" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="com.fasterxml.jackson.databind.JsonNode" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="java.io.IOException" %>
<%@ include file="getatribute.jsp" %>
<%@ include file="cifrado.jsp" %>
<%
    // Obtener parametros de la peticion
    String sesion = getSessionOrParam(request, session, "sesion");
    String pagina = getSessionOrParam(request, session, "pagina");
    String organizacion = getSessionOrParam(request, session, "organizacion");
    BufferedReader reader = null;
    HttpURLConnection connection = null;
    ObjectMapper mapper = new ObjectMapper();
    JsonNode datos = mapper.readTree("{}");
    JsonNode packages= mapper.readTree("[]");
    JsonNode libraries= mapper.readTree("[]");
    String jsonPageString = "{}";
    String idBody="main";
    String errorLoad="N";
    

    // Validar parametros requeridos
    if (sesion == null || sesion.trim().isEmpty() ||
        pagina == null || pagina.trim().isEmpty() ||
        organizacion == null || organizacion.trim().isEmpty()) {
        errorLoad = "Y";
        request.setAttribute("error", "Faltan parametros requeridos: sesion, pagina, organizacion");
    } else {
        
        // Realizar peticion al servicio remoto con parametros
        try {
            // Construir URL con parametros
            String baseUrl = "http://balanceador/api-dba/api/consulta";
            String dataJson = String.format(
                                    "{\"consulta\":\"pagina\",\"conexion\":\"liferay\",\"parametros\":{"
                                    +"\"pagina\":\""+pagina+"\"}}");
            String consultaCifrada = encriptarAES(dataJson);                            
            String parametros = "{\"consulta\":\"" + consultaCifrada + "\", \"sesion\":\"" + sesion +"\"}";
            
            URL urlObj = new URL(baseUrl);
            connection = (HttpURLConnection) urlObj.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("User-Agent", "JSP-HTTP-Client/1.0");
            connection.setDoOutput(true);
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(15000);
            OutputStream os = connection.getOutputStream();
            byte[] input = parametros.getBytes("UTF-8");
            os.write(input, 0, input.length);
            
            int responseCode = connection.getResponseCode();
            String responseMessage = connection.getResponseMessage();

            InputStream inputStream;
            if (responseCode >= 200 && responseCode < 300) {
                inputStream = connection.getInputStream();
            } else {
                inputStream = connection.getErrorStream();
            }

            reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBody.append(line);
            }

            if (responseCode == 200) {
                
                // Validar que el JSON sea valido
                try {
                    JsonNode jsonApidb = mapper.readTree(responseBody.toString()); 
                    JsonNode columnas = jsonApidb.get("columnas");
                    datos = jsonApidb.get("datos");
                    jsonPageString = datos.get(0).get(0).asText();
                    JsonNode jsonPage = mapper.readTree(jsonPageString);
                    packages = jsonPage.get("packages");
                    libraries = jsonPage.get("libraries");
                } catch (Exception jsonEx) {
                    request.setAttribute("error", "El servicio retorno un JSON invalido: " + jsonEx.getMessage());
                }
            } else {
                errorLoad = "Y";
                request.setAttribute("error", "Error del servicio remoto. Codigo: " + Integer.toString(responseCode) + 
                                   " - Respuesta: " + responseBody.toString());
            }
            
        } catch (Exception e) {
            errorLoad = "Y";
            request.setAttribute("error", "Error al conectar con el servicio: " + e.getMessage());
        } finally {
            // Cerrar conexiones
            if (reader != null) {
                try { reader.close(); } catch (IOException e) { }
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pagina Dinamica - ${param.page}</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .container { 
            padding: 20px; 
            font-family: Arial, sans-serif; 
            max-width: 1200px; 
            margin: 0 auto; 
        }
        .title { 
            color: #333; 
            margin-bottom: 10px; 
            font-size: 2em; 
        }
        .subtitle { 
            color: #666; 
            font-style: italic; 
            margin-bottom: 15px; 
        }
        .item-list { 
            margin: 15px 0; 
            padding-left: 20px; 
        }
        .nested-content { 
            background-color: #f8f9fa; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 10px 0;
            border-left: 4px solid #007bff;
        }
        .data-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
        }
        .data-table th, .data-table td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
        }
        .data-table th { 
            background-color: #f2f2f2; 
            font-weight: bold; 
        }
        .data-table tr:nth-child(even) { 
            background-color: #f9f9f9; 
        }
        .loading { 
            text-align: center; 
            color: #666; 
            padding: 40px;
            font-size: 1.2em;
        }
        .error { 
            background-color: #f8d7da; 
            color: #721c24; 
            padding: 20px; 
            border-radius: 5px; 
            border: 1px solid #f5c6cb;
            margin: 20px 0;
        }
        .highlight { 
            background-color: #fff3cd; 
            padding: 2px 4px; 
            border-radius: 3px; 
        }
        .deep-nested { 
            margin-left: 20px; 
            padding: 10px; 
            border-left: 2px solid #28a745; 
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .metadata {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 5px;
            font-size: 0.9em;
            color: #6c757d;
            margin-bottom: 20px;
        }
    </style>

    <script src="packages/jquery/jquery.min.js"></script>
    <script src="packages/bootstrap/js/bootstrap.min.js"></script>
    <script src="packages/crypto/aes.js"></script>
    <script src="jsonpage/variables.js"></script>
    <script src="jsonpage/core.js"></script>
    <script src="jsonpage/render.js"></script>
    <script src="jsonpage/actions.js"></script>
    <script src="jsonpage/connection.js"></script>
    <script src="jsonpage/database.js"></script>

    <% for (JsonNode pkg : packages) {
        String url = pkg.get("url").asText() +"?"+ pkg.get("version").asText() ;
        String tipo = pkg.get("tipo").asText();

        if ("javascript".equals(tipo)) { %>
            <script src="<%= url %>"></script>
    <%  }else 
        if ("css".equals(tipo)) { %>
            <link rel="stylesheet" href="<%= url %>" />
    <% 
        }
    }
    %>

    <% for (JsonNode lib : libraries) {
        String url = lib.get("source").asText() ;
        String tipo = lib.get("type").asText();

        if ("script".equals(tipo)) { %>
            <script src="<%= url %>"></script>
    <%  }else 
        if ("css".equals(tipo)) { %>
            <link rel="stylesheet" href="<%= url %>" />
    <% 
        }
    }
    %>
    <link rel="stylesheet" href="packages/material-icons/iconfont/material-icons.css">
    <link rel="stylesheet" href="packages/bootstrap/css/bootstrap.min.css" type="text/css" media="screen">
    <link rel="stylesheet" href="css/layouts.css" type="text/css" media="screen">

    <script>
        $(document).ready(function(){
            var page = {};
            load_start_jsonpage(<%= jsonPageString %>, '<%= idBody %>');
        });
    </script>
</head>

<body id="<%= idBody %>">

    <!-- Mostrar errores si los hay -->
    <% if(errorLoad == "Y"){ %>
        <div class="metadata">
            <strong>Parametros de la pagina:</strong>
            Pagina: ${param.page} | Organizacion: ${param.organization} | Sesion: ${not empty param.sesion ? '***encriptada***' : 'no proporcionada'}
        </div>
        <div class="error">
            <h3>Error al cargar el contenido</h3>
            <p>${error}</p>
            <p><strong>Parametros recibidos:</strong></p>
            <ul>
                <li>Sesion: ${not empty param.sesion ? 'Proporcionada (encriptada)' : 'No proporcionada'}</li>
                <li>Pagina: ${param.page}</li>
                <li>Organizacion: ${param.organization}</li>
            </ul>
        </div>
    <% } %>

</body>
</html>
