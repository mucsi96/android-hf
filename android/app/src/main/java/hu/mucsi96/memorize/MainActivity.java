package hu.mucsi96.memorize;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends Activity implements AuthenticationCallbacks {

    private NetworkMonitor networkMonitor;
    private WebAppInterface webAppInterface;
    private GooglePlusLoginService googlePlus;
    private AuthenticationInfo token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        googlePlus = new GooglePlusLoginService(this, this);
        webAppInterface = new WebAppInterface(this, "http://192.168.1.104", savedInstanceState, googlePlus);
        networkMonitor = new NetworkMonitor(this, webAppInterface);
    }

    @Override
    protected void onStart() {
        super.onStart();
        googlePlus.connect();
        networkMonitor.connect();
    }

    @Override
    protected void onStop() {
        super.onStop();
        googlePlus.disconnect();
        networkMonitor.disconnect();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        webAppInterface.saveState(outState);
    }

    @Override
    public void onAuthenticationInfoReady() {
        webAppInterface.load();
    }
}
