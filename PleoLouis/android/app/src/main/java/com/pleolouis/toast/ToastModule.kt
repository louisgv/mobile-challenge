package com.pleolouis.toast

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 *
 */

class ToastModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ToastModule"
    }

    override fun getConstants(): Map<String, Any> {
        val constants = HashMap<String, Any>()

        constants["SHORT"] = Toast.LENGTH_SHORT
        constants["LONG"] = Toast.LENGTH_LONG

        return constants
    }

    @ReactMethod
    fun show(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }

}