<%--
    Nombre: getatribute.jsp
    Propósito: Utilidad para obtener valores de sesión o request, y almacenarlos en sesión.
--%>
<%@ page import="java.util.Objects" %>
<%!
    /**
     * Método auxiliar para obtener un valor: primero de sesión, luego de request.
     * Si viene del request, se guarda en sesión.
     *
     * @param request  HttpServletRequest
     * @param session  HttpSession
     * @param key      Nombre del atributo (ej: usuarioId, orgId)
     * @return Valor como String o null
     */
    public String getSessionOrParam(HttpServletRequest request, HttpSession session, String key) {
        // 1. Buscar en la sesión
        Object value = session.getAttribute(key);
        if (value != null && !value.toString().trim().isEmpty()) {
            return value.toString().trim();
        }

        // 2. Buscar en los parámetros
        String paramValue = request.getParameter(key);
        if (paramValue != null && !paramValue.trim().isEmpty()) {
            // 3. Guardar en sesión para futuras solicitudes
            session.setAttribute(key, paramValue.trim());
            return paramValue.trim();
        }

        // 4. No encontrado
        return null;
    }
%>