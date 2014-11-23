package hu.mucsi96.memorize;

import android.app.Activity;
import android.net.http.SslError;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.util.Arrays;

public class WebAppInterface implements NetworkMonitorCallbacks, AuthenticationCallbacks {
    private WebView webView;
    private String url;
    private boolean webAppLoaded = false;
    private boolean isOnline = false;

    public WebAppInterface(final Activity context, String url, Bundle previousState, AuthenticationProvider authenticationProvider) {
        this.url = url;
        context.setContentView(R.layout.activity_main);
        webView = (WebView)context.findViewById(R.id.webview);
        if (previousState != null) {
            webView.restoreState(previousState);
        } else {
            webView.setWebViewClient(new WebViewClient() {

                @Override
                public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                    handler.proceed();
                }

                @Override
                public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                    super.onReceivedError(view, errorCode, description, failingUrl);
                    Log.v(Globals.TAG, "Error on loading URL: " + failingUrl);
                }
            });
            webView.getSettings().setDomStorageEnabled(true);
            webView.getSettings().setAppCachePath( context.getApplicationContext().getCacheDir().getAbsolutePath() );
            webView.getSettings().setAllowFileAccess( true );
            webView.getSettings().setAppCacheEnabled( true );
            webView.getSettings().setJavaScriptEnabled(true);
            webView.addJavascriptInterface(this, "Android");
            webView.addJavascriptInterface(authenticationProvider, "AuthenticationProvider");
        }
    }

    public void load() {
        Log.v(Globals.TAG, "Loading URL: " + url);
        webView.loadUrl(url);
        webAppLoaded = true;
    }

    @Override
    public void networkStatusChange(boolean isOnline) {
        this.isOnline = isOnline;
        Log.v(Globals.TAG, "Network status changed to: " + isOnline );
        if (isOnline) {
            webView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
            if(webAppLoaded) {
                callJavaScript("goOnline");
            } else {
                load();
            }
        } else {
            webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
            if(webAppLoaded) {
                callJavaScript("goOffline");
            } else {
                load();
            }
        }
    }

    @JavascriptInterface
    public void error(String error){
        Log.v(Globals.TAG, "WebViewError: " +  error);
    }

    @JavascriptInterface
    public void log(String message) {
        Log.v(Globals.TAG, "WebViewConsole: " +  message);
    }

    @JavascriptInterface
    public void getNetworkStatus() {
        if (isOnline) {
            callJavaScript("goOnline");
        } else {
            callJavaScript("goOffline");
        }
    }

    public void callJavaScript(String methodName, Object...params){
        boolean firstParam = true;
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("javascript:try{");
        stringBuilder.append(methodName);
        stringBuilder.append("(");
        for (Object param : params) {
            if (!firstParam) {
                stringBuilder.append(",");
                firstParam = false;
            }
            if(param instanceof String){
                stringBuilder.append("'");
                stringBuilder.append(param);
                stringBuilder.append("'");
            }
        }
        stringBuilder.append(")}catch(error){Android.log(error);}");
        Log.v(Globals.TAG, "Calling javascript: " + stringBuilder.toString());
        webView.loadUrl(stringBuilder.toString());
    }

    public void saveState(Bundle bundle) {
        webView.saveState(bundle);
    }

    @Override
    public void onAuthenticationInfoReady(AuthenticationInfo authenticationInfo) {
        callJavaScript("onAuthenticationInfoReady", authenticationInfo.toJSON());
    }

    @Override
    public void onAccessTokenReady(String token) {
        callJavaScript("onAccessTokenReady", token);
    }
}
