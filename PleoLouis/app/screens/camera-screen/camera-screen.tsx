import React, { useState } from "react"
import {
  SafeAreaView,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  LayoutRectangle,
  ImageStyle,
  Image,
  ActivityIndicator,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"

import { RNCamera as Camera, RNCamera, TakePictureResponse } from "react-native-camera"
import RNTextDetector from "react-native-text-detector"
import { Text } from "../../components/text"
import { screenHeight, screenWidth } from "../../utils/dimension"
import { Expense } from "../../models/expense"

import RepeatIcon from "./repeat-snap.svg"
import SnapIcon from "./snap-max.svg"
import CheckIcon from "./check.svg"
import { useStore } from "../../models/root-store"

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
}

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  padding: spacing[4],

}

const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  flexDirection: "row",
  justifyContent: "space-around",
}

const CAMERA_BORDER: ViewStyle = {
  borderRadius: 15,
  height: "100%",
  overflow: "hidden",
}

const CAMERA: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const CAMERA_PREVIEW: ImageStyle = {
  width: "100%",
  height: "100%",
}

const VISION_RECT: ViewStyle = {
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: color.palette.hotpink,
}

const CONTINUE: ViewStyle = {
  alignSelf: "center",
  borderRadius: 50,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const ICON: ImageStyle & TextStyle = {
  alignSelf: "center",
  width: 44,
  height: 44,
  color: color.palette.white,
}

export interface CameraScreenProps extends NavigationScreenProps<{ expenseData?: Expense }> {}

export const CameraScreen: React.FunctionComponent<CameraScreenProps> = props => {
  const expenseData = props.navigation.getParam("expenseData", null)

  const camera = React.useRef<RNCamera>()

  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const { addReceipt, refresh } = useStore()

  const [imageData, setImageData] = useState()
  const [visionData, setVisionData] = useState([])
  const [cameraLayout, setCameraLayout] = useState<LayoutRectangle>()

  const [uploading, setUploading] = useState(false)

  const uploadImage = async () => {
    setUploading(true)
    await addReceipt(expenseData, imageData)
    await refresh()
    goBack()
  }

  const getUpdatedVisionData = (visionResp, image: TakePictureResponse) => {
    const imageToScreenX = screenWidth / image.width
    const imageToScreenY = screenHeight / image.height

    return visionResp.map(item => ({
      ...item,
      position: {
        width: item.bounding.width * imageToScreenX,
        height: item.bounding.height * imageToScreenY,
        left: item.bounding.left * imageToScreenX - cameraLayout.x,
        top: item.bounding.top * imageToScreenY - cameraLayout.y,
      },
    }))
  }

  const takePicture = React.useMemo(
    () => async () => {
      if (!camera.current || !cameraLayout) return

      const data = await camera.current.takePictureAsync(PICTURE_OPTIONS)

      if (!data.uri) {
        return
      }

      setImageData(data)

      console.tron.log(data)
      // Process image
      const visionResp = await RNTextDetector.detectFromUri(data.uri)
      console.tron.log(visionResp)

      if (!(visionResp && visionResp.length > 0)) {
        return
      }

      setVisionData(getUpdatedVisionData(visionResp, data))
    },
    [camera, cameraLayout],
  )

  return (
    <View style={FULL}>
      <Header leftIcon={uploading ? null : "back"} headerTx="cameraScreen.title" onLeftPress={goBack} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View>
          <View style={CAMERA_BORDER} onLayout={e => setCameraLayout(e.nativeEvent.layout)}>
            {!imageData ? (
              <Camera
                ref={camera}
                key="camera"
                style={CAMERA}
                notAuthorizedView={null}
                playSoundOnCapture
              />
            ) : (
              <Image style={CAMERA_PREVIEW} source={imageData} />
            )}
            {visionData.map((item, i) => (
              <TouchableOpacity style={[VISION_RECT, item.position]} key={item.text + i}>
                <Text preset="light">{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Screen>

      <SafeAreaView>
        <View style={FOOTER_CONTENT}>
          {uploading && <ActivityIndicator size="large" color={color.palette.green} />}
          {imageData && !uploading && (
            <>
              <Button
                style={CONTINUE}
                preset="idle"
                onPress={() => {
                  setImageData(null)
                  setVisionData([])
                }}
              >
                <RepeatIcon style={ICON} />
              </Button>
              <Button style={CONTINUE} preset="submit" onPressOut={uploadImage}>
                <CheckIcon style={ICON} />
              </Button>
            </>
          )}
          {!imageData && (
            <Button style={CONTINUE} onPress={takePicture}>
              <SnapIcon style={ICON} />
            </Button>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}
