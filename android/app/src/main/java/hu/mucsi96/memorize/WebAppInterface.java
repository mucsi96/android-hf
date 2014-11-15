package hu.mucsi96.memorize;

import android.app.Activity;
import android.content.Context;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.http.SslError;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class WebAppInterface {
    private Activity context;
    private WebView webView;

    public WebAppInterface(final Activity context) {
        this.context = context;
        context.setContentView(R.layout.activity_main);
        webView = (WebView)context.findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed();
            }
        });
        WebSettings webSettings = webView.getSettings();
        webView.getSettings().setAppCachePath( context.getApplicationContext().getCacheDir().getAbsolutePath() );
        webView.getSettings().setAllowFileAccess( true );
        webView.getSettings().setAppCacheEnabled( true );
        webView.getSettings().setCacheMode( WebSettings.LOAD_DEFAULT ); // load online by default

        if ( !isOnline() ) { // loading offline
            webView.getSettings().setCacheMode( WebSettings.LOAD_CACHE_ELSE_NETWORK );
        }
        webSettings.setJavaScriptEnabled(true);
        webView.addJavascriptInterface(this, "Android");
    }

    public void load(String url) {
        webView.loadUrl(url);
    }

    @JavascriptInterface
    public boolean isOnline() {
        try
        {
            ConnectivityManager cm = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
            return cm.getActiveNetworkInfo().isConnectedOrConnecting();
        }
        catch (Exception e)
        {
            return false;
        }
    }

    @JavascriptInterface
    public void onError(String error){
        throw new IllegalArgumentException(error);
    }

    public void callJavaScript(String methodName, Object...params){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("javascript:try{");
        stringBuilder.append(methodName);
        stringBuilder.append("(");
        for (Object param : params) {
            if(param instanceof String){
                stringBuilder.append("'");
                stringBuilder.append(param);
                stringBuilder.append("'");
            }
            stringBuilder.append(",");
        }
        stringBuilder.append(")}catch(error){Android.onError(error.message);}");
        webView.loadUrl(stringBuilder.toString());
    }
}
