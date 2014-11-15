package hu.mucsi96.memorize;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.net.http.SslError;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesClient;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.plus.Plus;


public class MainActivity extends Activity {

    private WebView webView;
    private GooglePlusLoginService googlePlus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        googlePlus = new GooglePlusLoginService(this);

        setContentView(R.layout.activity_main);
        webView = (WebView)findViewById(R.id.webview);
        webView.loadUrl("http://192.168.1.104");
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed();
            }
        });
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
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
}
