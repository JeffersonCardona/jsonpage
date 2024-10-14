<%@ page 
    language="java"
    contentType="application/json; 
    charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ page import="java.net.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>

<%
    StringBuffer sbf = new StringBuffer();
    String urlDefault = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();

    try {
        String line;
        boolean validate = false;
        
        //Parameters
        String host = request.getParameter("host").replaceAll(" ","%20");
        String json = request.getParameter("json").replaceAll(" ","%20");
        
        if(host.indexOf("http") == 0){
            URL url = new URL(host);
            URLConnection urlCon = url.openConnection();
            
            urlCon.setDoOutput(true);
            urlCon.setDoInput(true);
            OutputStreamWriter writer = new OutputStreamWriter(urlCon.getOutputStream());
            writer.write(json);
            writer.flush();

            BufferedReader reader = new BufferedReader(new InputStreamReader(urlCon.getInputStream()));

            while ((line = reader.readLine()) != null) {
                sbf.append(line);
            }
            
            writer.close();
            reader.close();
        }else{
            response.sendRedirect(urlDefault);
        }
    } catch (Exception e){
        response.sendRedirect(urlDefault);
    }
%>
<%=sbf.toString().replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>","")%>