package hu.mucsi96.memorize;

import org.json.JSONException;
import org.json.JSONObject;

public class AuthenticationInfo {
    private String id;
    private String userName;
    private String email;
    private String accessToken;

    public String getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        JSONObject o = new JSONObject();
        try {
            o.put("type", "Google");
            o.put("id", id);
            o.put("userName", userName);
            o.put("email", email);
            o.put("accessToken", accessToken);
        } catch(JSONException e) {
            
        }
        return o.toString();
    }
}
