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

    private Activity context;
    private GooglePlusLoginCallbacks callbacks;

    public GoogleTokenTask(Activity context, GooglePlusLoginCallbacks callbacks) {
        this.context = context;
        this.callbacks = callbacks;
    }

    @Override
    protected String doInBackground(String... params) {
        String accountName = params[0];
        String scopes = "oauth2:profile email";
        String token = null;
        try {
            token = GoogleAuthUtil.getToken(context, accountName, scopes);
        } catch (IOException e) {
            Log.e("hu.mucsi96.memorize", e.getMessage());
        } catch (UserRecoverableAuthException e) {
            Toast.makeText(context, "Google authentication problem!", Toast.LENGTH_LONG);
        } catch (GoogleAuthException e) {
            Log.e("hu.mucsi96.memorize", e.getMessage());
        }
        return token;
    }

    @Override
    protected void onPostExecute(String token) {
        super.onPostExecute(token);
        callbacks.onTokenReady(token);
    }
}
