package com.pleolouis.popup

import android.net.Uri
import android.os.Build
import android.transition.Transition
import android.view.Gravity
import android.view.LayoutInflater
import android.view.WindowManager
import android.widget.PopupWindow
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pleolouis.R
import me.relex.photodraweeview.PhotoDraweeView


/**
 * Popup an image in a modal
 */

class ImagePopupModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ImagePopupModule"
    }

    @RequiresApi(Build.VERSION_CODES.M)
    @ReactMethod
    fun popImage(uri : String) {
        // inflate the layout of the popup window
        val inflater = LayoutInflater.from(currentActivity)
        val popupView = inflater.inflate(R.layout.image_popup, null)

        // create the popup window
        val width = WindowManager.LayoutParams.MATCH_PARENT
        val height = WindowManager.LayoutParams.MATCH_PARENT
        val focusable = true // lets taps outside the popup also dismiss it

        val popupWindow = PopupWindow(popupView, width, height, focusable)

        popupWindow.enterTransition = android.transition.Fade()
        popupWindow.exitTransition = android.transition.Fade()

        // show the popup window
        popupWindow.showAtLocation(popupView, Gravity.CENTER, 0, 0)

        val draweeView = popupView.findViewById<PhotoDraweeView>(R.id.photo_drawee_view)
//        draweeView.setPhotoUri(Uri.parse(uri))

//        draweeView.setImageURI(uri)
        draweeView.setOnViewTapListener{ view, x, y ->
            Toast.makeText(reactApplicationContext, "Common man...", Toast.LENGTH_SHORT).show()
            draweeView.setImageURI("https://raw.githubusercontent.com/facebook/fresco/master/docs/static/logo.png", reactApplicationContext)
        }

        draweeView.setOnPhotoTapListener{ view, x, y ->
            Toast.makeText(reactApplicationContext, "Common man...", Toast.LENGTH_SHORT).show()
            draweeView.setImageURI("https://raw.githubusercontent.com/facebook/fresco/master/docs/static/logo.png", reactApplicationContext)
        }

        popupView.setOnTouchListener { _, _ ->
            popupWindow.dismiss()
            true
        }
    }

}