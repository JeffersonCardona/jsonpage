<%!
// Método reutilizable para cifrar texto con AES (modo CBC, PKCS5Padding)
// Compatible con CifradoUtil.java
public static String encriptarAES(String json) throws Exception {
    // Obtener clave e IV desde variables de entorno (igual que en CifradoUtil)
    String secretKeyStr = System.getenv("AES_SECRET_JSON");
    String ivVectorStr = System.getenv("AES_IV_VECTOR");

    if (secretKeyStr == null || secretKeyStr.isEmpty()) {
        throw new RuntimeException("Variable de entorno 'AES_SECRET_JSON' no definida");
    }
    if (ivVectorStr == null || ivVectorStr.isEmpty()) {
        throw new RuntimeException("Variable de entorno 'AES_IV_VECTOR' no definida");
    }

    byte[] keyBytes = secretKeyStr.getBytes(java.nio.charset.StandardCharsets.UTF_8);
    byte[] ivBytes = ivVectorStr.getBytes(java.nio.charset.StandardCharsets.UTF_8);

    javax.crypto.spec.SecretKeySpec claveSecreta = new javax.crypto.spec.SecretKeySpec(keyBytes, "AES");
    javax.crypto.spec.IvParameterSpec ivSpec = new javax.crypto.spec.IvParameterSpec(ivBytes);

    javax.crypto.Cipher cipher = javax.crypto.Cipher.getInstance("AES/CBC/PKCS5Padding");
    cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, claveSecreta, ivSpec);

    byte[] cifrado = cipher.doFinal(json.getBytes(java.nio.charset.StandardCharsets.UTF_8));
    return java.util.Base64.getEncoder().encodeToString(cifrado);
}
%>