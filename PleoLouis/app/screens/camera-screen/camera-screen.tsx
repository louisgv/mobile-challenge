import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  ViewStyle,
  TouchableOpacity,
  LayoutRectangle,
  ImageStyle,
  Image,
  ActivityIndicator,
  TextStyle,
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

import { useStore } from "../../models/root-store"
import { Icon } from "../../components/icon"
import { Toast } from "../../services/native/toast"

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
  height: 120,
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

const ACTION_BUTTON: ViewStyle = {
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  borderRadius: 40,
}

const SCORE_CONTAINER: ViewStyle = {
  position: "absolute",
  backgroundColor: color.palette.blue,
  width: 200,
  bottom: 0,
  padding: spacing[1],
  alignSelf: "center",
  borderTopEndRadius: 15,
  borderTopStartRadius: 15,
  alignItems: "center",
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

  const [receiptScore, setReceiptScore] = useState(0)

  const expenseDataStringList = [
    expenseData.user.email,
    expenseData.user.first,
    expenseData.user.last,
    expenseData.merchant,
    expenseData.amount.value.toString(),
    expenseData.amount.currency.toString(),
  ].map(e => e.toLowerCase())

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
      const visionOutput = (await RNTextDetector.detectFromUri(data.uri)) as Array<VisionResponse>
      console.tron.log(visionOutput)

      if (!(visionOutput && visionOutput.length > 0)) {
        return
      }

      const receiptText = visionOutput.map(d => d.text.toLowerCase()).join("")

      console.tron.log(receiptText)

      console.tron.log(expenseDataStringList)

      const scoreList = expenseDataStringList.map(s => receiptText.match(s)).filter(d => d)

      const score = (scoreList.length / expenseDataStringList.length) * 100

      setReceiptScore(score)

      if(score <= 20) {
        Toast.show("Score too low (<=20), please try again", Toast.LONG)
      }

      // filter(s => s.toLowerCase().includes(filterQuery.toLowerCase())).length > 0

      setVisionData(getUpdatedVisionData(visionOutput, data))
    },
    [camera, cameraLayout],
  )

  return (
    <View style={FULL}>
      <Header
        leftIcon={uploading ? null : "back"}
        headerTx="cameraScreen.title"
        onLeftPress={goBack}
      />
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
            <View
              style={[
                SCORE_CONTAINER,
                {
                  backgroundColor: receiptScore > 20 ? color.palette.green : color.palette.blue,
                },
              ]}
            >
              <Text preset="light">{receiptScore.toFixed(2)}%</Text>
            </View>
          </View>
        </View>
      </Screen>

      <SafeAreaView>
        <View style={FOOTER_CONTENT}>
          {uploading && <ActivityIndicator size="large" color={color.palette.green} />}
          {imageData && !uploading && (
            <>
              <Button
                style={ACTION_BUTTON}
                preset="idle"
                onPress={() => {
                  setImageData(null)
                  setVisionData([])
                }}
              >
                <Icon preset="button" icon="repeat" />
              </Button>
              {receiptScore > 20 && (
                <Button style={ACTION_BUTTON} preset="submit" onPressOut={uploadImage}>
                  <Icon preset="button" icon="check" />
                </Button>
              )}
            </>
          )}
          {!imageData && (
            <Button style={ACTION_BUTTON} onPress={takePicture}>
              <Icon preset="button" icon="snap" />
            </Button>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}
