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

public class GoogleAuthenticationProvider implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, AuthenticationProvider {

    private static final int RC_SIGN_IN = 0;
    private Activity context;
    private GoogleApiClient mGoogleApiClient;
    private boolean mIntentInProgress;
    private AuthenticationCallbacks callbacks;

    public GoogleAuthenticationProvider(Activity context){
        this.context = context;
    }

    public void setCallbacks(AuthenticationCallbacks callbacks) {
        this.callbacks = callbacks;
    }

    @Override
    public void onConnected(Bundle bundle) {
        if (mGoogleApiClient.isConnected()) {
            String email = Plus.AccountApi.getAccountName(mGoogleApiClient);
            String accountId = Plus.PeopleApi.getCurrentPerson(mGoogleApiClient).getId();
            String userName = Plus.PeopleApi.getCurrentPerson(mGoogleApiClient).getDisplayName();

            mGoogleApiClient.disconnect();
            AuthenticationInfo authenticationInfo = new AuthenticationInfo();
            authenticationInfo.setId(accountId);
            authenticationInfo.setUserName(userName);
            authenticationInfo.setEmail(email);

            Log.v(Globals.TAG, "AuthInfo: " + authenticationInfo.toJSON());
            Log.v(Globals.TAG, "Getting access token for " + authenticationInfo.getEmail());
            new GoogleTokenTask(context, callbacks).execute(authenticationInfo.getEmail());
            callbacks.onAuthenticationInfoReady(authenticationInfo);
        } else {
            mGoogleApiClient.connect();
        }
    }

    @Override
    public void onConnectionSuspended(int i) {

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
    public void getAuthenticationInfo() {
        Log.v(Globals.TAG, "AuthenticationInfo requested.");
        mGoogleApiClient = new GoogleApiClient.Builder(context)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(Plus.API)
                .addScope(Plus.SCOPE_PLUS_LOGIN)
                .addScope(Plus.SCOPE_PLUS_PROFILE)
                .build();
        mGoogleApiClient.connect();
    }
}
