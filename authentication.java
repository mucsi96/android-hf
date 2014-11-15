/*To obtain an access token and refresh token for your server, you can request a one-time 
authorization code that your server exchanges for these two tokens. You request the one-time
code by using the GoogleAuthUtil.getToken() method and specifying a unique scope string that 
cludes the OAuth 2.0 client ID of your server. After you successfully connect the user,
you can call GoogleAuthUtil.getToken() which gives you a string with the one-time code.*/

/* Your server can then use the Google API Client libraries to exchange the one-time
authorization code and then store the tokens. This one-time use code increases the security
over a standard OAuth 2.0 flow; however, you need to exchange it for the tokens immediately
to ensure the security of the tokens. You should send the one-time authorization code as
securely as possible: use HTTPs and send it as POST data or in the request headers.*/

//https://github.com/google/google-api-nodejs-client

//http://vk.amberfog.com/devfest/Android_Make_Social.pdf

//https://developers.google.com/+/
//https://developers.google.com/+/mobile/android/getting-started
//https://developers.google.com/+/web/signin/server-side-flow
//https://developers.google.com/+/web/signin/reference?hl=pl#page-config


// Allow user to select an account
// AccountManager.getAccountsByType("com.google");

String scope = "https://www.googleapis.com/auth/tasks";

// Get an access token for 'email' account and requested scope
String token = GoogleAuthUtil.getToken(context, email, scope);


/////////////////////////////////////////////////////////////////////////

https://raw.githubusercontent.com/progmize/sixdots/master/android/test/sixdots/src/com/pyracube/sixdots/GoogleLoginActivity.java

package com.pyracube.sixdots;

import java.io.IOException;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.google.android.gms.auth.GoogleAuthException;
import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.auth.GooglePlayServicesAvailabilityException;
import com.google.android.gms.auth.UserRecoverableAuthException;

/**
 * Activity which displays a login screen to the user, offering registration as
 * well.
 */
@SuppressLint("SetJavaScriptEnabled")
public class GoogleLoginActivity extends BaseLoginActivity {

	static final int REQUEST_ACCOUNT_PICKER = 1;
	static final int REQUEST_AUTHORIZATION = 2;
	static final int CAPTURE_IMAGE = 3;
	static final String GOOGLE_API_URL = "https://accounts.google.com/o/oauth2/auth%s";

	WebView _webView;
	AlertDialog.Builder _builder;
	String _token;

	public GoogleLoginActivity() {
		super(R.layout.activity_login, R.id.webview);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected void afterOnCreate() {
		super.afterOnCreate();

		_builder = new AlertDialog.Builder(this);
		_builder.setTitle("Cookies").setMessage("hello")
				.setNeutralButton("Close", null).show();

		getAndUseAuthTokenInAsyncTask(getAccountNames()[0]);

	}

	private AccountManager _accountManager;

	private String[] getAccountNames() {
		_accountManager = AccountManager.get(this);
		Account[] accounts = _accountManager
				.getAccountsByType(GoogleAuthUtil.GOOGLE_ACCOUNT_TYPE);
		String[] names = new String[accounts.length];
		for (int i = 0; i < names.length; i++) {
			names[i] = accounts[i].name;
		}
		return names;
	}

	void getAndUseAuthTokenInAsyncTask(String email) {
		AsyncTask<String, Void, String> task = new AsyncTask<String, Void, String>() {
			@Override
			protected String doInBackground(String... params) {
				// TODO Auto-generated method stub
				_token = getAccessToken(params[0].toString());
				return _token;
			}

			@Override
			protected void onPostExecute(String token) {
				_builder.setTitle("Cookies").setMessage(token)
						.setNeutralButton("Close", null).show();
			}
		};

		task.execute(email);
	}

	private String getAccessToken(String email) {
		String token = null;
		String message = null;
		try {
			token = GoogleAuthUtil.getToken(this, email,
					"oauth2:https://www.googleapis.com/auth/userinfo.email");
		} catch (GooglePlayServicesAvailabilityException playEx) {
			message = playEx.getMessage();
		} catch (UserRecoverableAuthException e) {
			startActivityForResult(e.getIntent(), REQUEST_AUTHORIZATION);
		} catch (GoogleAuthException authEx) {
			// This is likely unrecoverable.
			message = authEx.getMessage();
		} catch (IOException ioEx) {
			// doExponentialBackoff();
			message = ioEx.getMessage();
		}

		return token;
	}

	private String getUrlByStatus(String detail) {
		return String.format(GOOGLE_API_URL, detail);
	}

	private void setupWebView() {
		_webView = (WebView) findViewById(R.id.webview);
		WebSettings websettings = _webView.getSettings();
		websettings.setJavaScriptEnabled(true);
	}

	private void executeUrl(String url) {
		_webView.loadUrl(url);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		super.onCreateOptionsMenu(menu);
		getMenuInflater().inflate(R.menu.activity_login, menu);
		return true;
	}

	/**
	 * Attempts to sign in or register the account specified by the login form.
	 * If there are form errors (invalid email, missing fields, etc.), the
	 * errors are presented and no actual login attempt is made.
	 */
	public Dialog onCreateDialog(Bundle savedInstanceState) {
		AlertDialog.Builder builder = new AlertDialog.Builder(this);
		// Get the layout inflater
		LayoutInflater inflater = this.getLayoutInflater();

		// Inflate and set the layout for the dialog
		// Pass null as the parent view because its going in the dialog layout
		builder.setView(inflater.inflate(R.layout.dialog_message, null))
				// Add action buttons
				.setPositiveButton(R.string.OK,
						new DialogInterface.OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog, int id) {
								// sign in the user ...
							}
						})
				.setNegativeButton(R.string.OK,
						new DialogInterface.OnClickListener() {
							@Override
							public void onClick(DialogInterface dialog, int id) {

							}
						});
		return builder.create();
	}
}