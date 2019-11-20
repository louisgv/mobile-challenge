package com.pleolouis.popup

import android.graphics.drawable.Animatable
import android.os.Build
import android.view.Gravity
import android.view.LayoutInflater
import android.view.WindowManager
import android.widget.PopupWindow
import androidx.annotation.RequiresApi
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.backends.pipeline.PipelineDraweeControllerBuilder
import com.facebook.drawee.controller.BaseControllerListener
import com.facebook.imagepipeline.image.ImageInfo
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

        draweeView.setImageURI(uri)

        val controller: PipelineDraweeControllerBuilder = Fresco.newDraweeControllerBuilder()
        controller.setUri(uri)
        controller.oldController = draweeView.controller

        controller.controllerListener = object : BaseControllerListener<ImageInfo?>() {
            override fun onFinalImageSet(id: String?, imageInfo: ImageInfo?, animatable: Animatable?) {
                super.onFinalImageSet(id, imageInfo, animatable)
                if (imageInfo == null || draweeView == null) {
                    return
                }
                draweeView.update(imageInfo.width, imageInfo.height)
            }
        }

        draweeView.controller = controller.build()

        popupView.setOnTouchListener { _, _ ->
            popupWindow.dismiss()
            true
        }
    }

}