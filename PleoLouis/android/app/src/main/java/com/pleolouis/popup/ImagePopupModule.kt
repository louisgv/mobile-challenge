package com.pleolouis.popup

import android.view.Gravity
import android.view.LayoutInflater
import android.view.WindowManager
import android.widget.PopupWindow
import android.widget.Toast
import com.facebook.drawee.view.SimpleDraweeView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pleolouis.R


/**
 * Popup an image in a modal
 */

class ImagePopupModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ImagePopupModule"
    }

    @ReactMethod
    fun popImage(uri : String) {

        Toast.makeText(reactApplicationContext, uri, Toast.LENGTH_SHORT).show()

        // inflate the layout of the popup window
        val inflater = LayoutInflater.from(currentActivity)
        val popupView = inflater.inflate(R.layout.image_popup, null)

        // create the popup window
        val width = WindowManager.LayoutParams.MATCH_PARENT
        val height = WindowManager.LayoutParams.MATCH_PARENT
        val focusable = true // lets taps outside the popup also dismiss it

        val popupWindow = PopupWindow(popupView, width, height, focusable)

        // show the popup window
        popupWindow.showAtLocation(popupView, Gravity.CENTER, 0, 0)

//        val draweeView = popupView.findViewById(R.id.popup_image_drawee) as SimpleDraweeView
//        draweeView.setImageURI(uri)

        popupView.setOnTouchListener { _, _ ->
            popupWindow.dismiss()
            true
        }
    }

}