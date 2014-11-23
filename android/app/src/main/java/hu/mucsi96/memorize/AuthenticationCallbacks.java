package hu.mucsi96.memorize;

public interface AuthenticationCallbacks {
    void onAuthenticationInfoReady(AuthenticationInfo authenticationInfo);
    void onAccessTokenReady(String token);
}
