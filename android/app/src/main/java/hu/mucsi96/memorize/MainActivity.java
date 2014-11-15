package hu.mucsi96.memorize;

import android.app.Activity;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Toast;

public class MainActivity extends Activity implements GooglePlusLoginCallbacks {

    private WebAppInterface webAppInterface;
    private GooglePlusLoginService googlePlus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        googlePlus = new GooglePlusLoginService(this, this);
        webAppInterface = new WebAppInterface(this);
        webAppInterface.load("http://192.168.1.104");
    }

    @Override
    protected void onStart() {
        super.onStart();
        googlePlus.connect();
    }

    @Override
    protected void onStop() {
        super.onStop();
        googlePlus.disconnect();
    }

    @Override
    public void onConnected(String accountName) {
        Toast.makeText(this, "User " + accountName + " is connected!", Toast.LENGTH_LONG).show();
    }
}
