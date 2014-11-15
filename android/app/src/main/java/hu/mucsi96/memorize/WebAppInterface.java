package hu.mucsi96.memorize;

import android.app.Activity;
import android.content.Context;
import android.net.http.SslError;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class WebAppInterface {
    private Activity context;
    private WebView webView;

    public WebAppInterface(Activity context) {
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
        webSettings.setJavaScriptEnabled(true);
        webView.addJavascriptInterface(this, "Android");
    }

    public void load(String url) {
        webView.loadUrl(url);
    }

    @JavascriptInterface
    public boolean isOnline() {
        return true;
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
