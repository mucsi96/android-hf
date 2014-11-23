package hu.mucsi96.memorize;

import org.json.JSONException;
import org.json.JSONObject;

public class AuthenticationInfo {
    private String id;
    private String userName;
    private String email;

    public String getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
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

    public String toJSON() {
        JSONObject o = new JSONObject();
        try {
            o.put("type", "Google");
            o.put("id", id);
            o.put("userName", userName);
            o.put("email", email);
        } catch(JSONException e) {
            e.printStackTrace();
        }
        return o.toString();
    }

    public static AuthenticationInfo fromJSON(String json) {
        AuthenticationInfo authenticationInfo = null;
        try {
            JSONObject o = new JSONObject(json);
            authenticationInfo = new AuthenticationInfo();
            authenticationInfo.setId(o.getString("id"));
            authenticationInfo.setUserName(o.getString("userName"));
            authenticationInfo.setEmail(o.getString("email"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return authenticationInfo;
    }
}
