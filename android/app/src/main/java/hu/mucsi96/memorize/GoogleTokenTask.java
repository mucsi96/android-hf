package hu.mucsi96.memorize;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.auth.GoogleAuthException;
import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.auth.UserRecoverableAuthException;

import java.io.IOException;

public class GoogleTokenTask  extends AsyncTask<String, Void, String> {

    private final static String G_PLUS_SCOPE =
            "oauth2:https://www.googleapis.com/auth/plus.login";
    private final static String USERINFO_SCOPE =
            "https://www.googleapis.com/auth/userinfo.profile";
    private final static String SCOPES = G_PLUS_SCOPE + " " + USERINFO_SCOPE;
    private Activity context;
    private AuthenticationCallbacks callbacks;

    public GoogleTokenTask(Activity context, AuthenticationCallbacks callbacks) {
        this.context = context;
        this.callbacks = callbacks;
    }

    @Override
    protected String doInBackground(String... params) {
        String accountName = params[0];
        String token = null;
        try {
            token = GoogleAuthUtil.getToken(context, accountName, SCOPES);
        } catch (IOException e) {
            Log.e(Globals.TAG, e.getMessage());
        } catch (UserRecoverableAuthException e) {
            Toast.makeText(context, "Google authentication problem!", Toast.LENGTH_LONG);
        } catch (GoogleAuthException e) {
            Log.e(Globals.TAG, e.getMessage());
        }
        return token;
    }

    @Override
    protected void onPostExecute(String token) {
        super.onPostExecute(token);
        callbacks.onAccessTokenReady(token);
    }
}
