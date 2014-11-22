package hu.mucsi96.memorize;

import android.app.Activity;
import android.net.http.SslError;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebAppInterface implements NetworkMonitorCallbacks {
    private WebView webView;
    private String url;

    public WebAppInterface(final Activity context, String url) {
        this.url = url;
        context.setContentView(R.layout.activity_main);
        webView = (WebView)context.findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed();
            }
        });
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAppCachePath( context.getApplicationContext().getCacheDir().getAbsolutePath() );
        webView.getSettings().setAllowFileAccess( true );
        webView.getSettings().setAppCacheEnabled( true );
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(this, "Android");
        webView.loadUrl(url);
    }

    @Override
    public void networkStatusChange(boolean isOnline) {
        Log.v("hu.mucsi96.memorize", "networkStatusChange to: " + isOnline );
        if (isOnline) {
            webView.getSettings().setCacheMode( WebSettings.LOAD_DEFAULT );
            callJavaScript("goOnline");
        } else {
            webView.getSettings().setCacheMode( WebSettings.LOAD_CACHE_ONLY);
            callJavaScript("goOffline");
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
        Log.v("hu.mucsi96.memorize", "Calling javascript: " + stringBuilder.toString());
        webView.loadUrl(stringBuilder.toString());
    }
}
