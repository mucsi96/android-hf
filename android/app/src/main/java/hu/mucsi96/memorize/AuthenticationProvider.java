package hu.mucsi96.memorize;

import android.webkit.JavascriptInterface;

public interface AuthenticationProvider {
    @JavascriptInterface
    void getAuthenticationInfo();
}
