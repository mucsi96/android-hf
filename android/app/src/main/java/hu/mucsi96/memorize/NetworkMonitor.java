package hu.mucsi96.memorize;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.util.Log;

public class NetworkMonitor extends BroadcastReceiver {

    private Activity context;
    private NetworkMonitorCallbacks callbacks;
    private Boolean online;

    public NetworkMonitor(Activity context, NetworkMonitorCallbacks callbacks) {
        this.context = context;
        this.callbacks = callbacks;
        online = null;
    }

    public void connect() {
        Log.v("hu.mucsi96.memorize", "network monitor connected");
        context.registerReceiver(this, new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION));
        onReceive(null, null);
    }

    public void disconnect() {
        context.unregisterReceiver(this);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Boolean nowOnline = isOnline();
        if (online != nowOnline) {
            callbacks.networkStatusChange(nowOnline);
            online = nowOnline;
        }
    }

    private Boolean isOnline() {
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
}
