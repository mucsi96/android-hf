package hu.mucsi96.memorize;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {

    private NetworkMonitor networkMonitor;
    private WebAppInterface webAppInterface;
    private GoogleAuthenticationProvider googleAuthenticationProvider;
    private AuthenticationInfo token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        googleAuthenticationProvider = new GoogleAuthenticationProvider(this);
        networkMonitor = new NetworkMonitor(this);
        webAppInterface = new WebAppInterface(this, "http://192.168.1.104", savedInstanceState, googleAuthenticationProvider);
        googleAuthenticationProvider.setCallbacks(webAppInterface);
        networkMonitor.setCallbacks(webAppInterface);
    }

    @Override
    protected void onStart() {
        super.onStart();
        networkMonitor.connect();
    }

    @Override
    protected void onStop() {
        super.onStop();
        networkMonitor.disconnect();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        webAppInterface.saveState(outState);
    }
}
