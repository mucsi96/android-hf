package hu.mucsi96.memorize;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.auth.GoogleAuthException;
import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.auth.UserRecoverableAuthException;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.plus.Plus;
import com.google.android.gms.plus.model.people.Person;

import java.io.IOException;

public class GooglePlusLoginService implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, GooglePlusLoginCallbacks ,AuthenticationInfoService {

    private static final int RC_SIGN_IN = 0;
    private Activity context;
    private GoogleApiClient mGoogleApiClient;
    private boolean mIntentInProgress;
    private AuthenticationInfo authenticationInfo;
    private AuthenticationCallbacks callbacks;

    public GooglePlusLoginService(Activity context, AuthenticationCallbacks callbacks){
        this.context = context;
        this.callbacks = callbacks;
        mGoogleApiClient = new GoogleApiClient.Builder(context)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(Plus.API)
                .addScope(Plus.SCOPE_PLUS_LOGIN)
                .build();
    }

    public void connect() {
        mGoogleApiClient.connect();
    }

    public void disconnect() {
        if (mGoogleApiClient.isConnected()) {
            mGoogleApiClient.disconnect();
        }
    }

    protected void onActivityResult(int requestCode, int responseCode, Intent intent) {
        if (requestCode == RC_SIGN_IN) {
            mIntentInProgress = false;

            if (!mGoogleApiClient.isConnecting()) {
                mGoogleApiClient.connect();
            }
        }
    }

    @Override
    public void onConnected(Bundle bundle) {
        if (authenticationInfo == null || authenticationInfo.getAccessToken() == null) {
            String accountId = Plus.PeopleApi.getCurrentPerson(mGoogleApiClient).getId();
            String email = Plus.AccountApi.getAccountName(mGoogleApiClient);
            String userName = Plus.PeopleApi.getCurrentPerson(mGoogleApiClient).getDisplayName();

            authenticationInfo = new AuthenticationInfo();
            authenticationInfo.setId(accountId);
            authenticationInfo.setUserName(userName);
            authenticationInfo.setEmail(email);

            Log.v("hu.mucsi96.memorize", "AuthInfo: " + authenticationInfo.toString());
            Log.v("hu.mucsi96.memorize", "Getting access token for" + email);

            new GoogleTokenTask(context, this).execute(email);
        }
    }

    @Override
    public void onConnectionSuspended(int i) {
        mGoogleApiClient.connect();
    }

    @Override
    public void onConnectionFailed(ConnectionResult result) {

        if (!mIntentInProgress && result.hasResolution()) {
            try {
                mIntentInProgress = true;
                context.startIntentSenderForResult(result.getResolution().getIntentSender(),
                        RC_SIGN_IN, null, 0, 0, 0);
            } catch (IntentSender.SendIntentException e) {
                // The intent was canceled before it was sent.  Return to the default
                // state and attempt to connect to get an updated ConnectionResult.
                mIntentInProgress = false;
                mGoogleApiClient.connect();
            }
        }
    }

    @Override
    public AuthenticationInfo getAuthenticationInfo() {
        Log.v("hu.mucsi96.memorize", "AuthenticationInfo requested. Current:" + authenticationInfo.toString());
        if (authenticationInfo == null) {
            Toast.makeText(context, "Google authentication problem!", Toast.LENGTH_LONG);
        }

        return authenticationInfo;
    }

    @Override
    public void onTokenReady(String token) {
        Log.v("hu.mucsi96.memorize", "Access token is ready: " + token);
        this.authenticationInfo.setAccessToken(token);
        callbacks.onAuthenticationInfoReady();
    }
}
