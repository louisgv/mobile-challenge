import * as React from "react"
import {
  SafeAreaView,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  LayoutRectangle,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"

import {
  RNCamera as Camera,
  RNCamera,
  TakePictureResponse,
} from "react-native-camera"
import RNTextDetector from "react-native-text-detector"
import { Text } from "../../components/text"
import { screenHeight, screenWidth } from "../../utils/dimension"

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
}

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const CONTINUE: ViewStyle = {
  alignSelf: "center",
  width: "80%",
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const CONTINUE_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: "400",
  fontFamily: "Roboto",
  letterSpacing: 0.8,
}

const CAMERA_BORDER: ViewStyle = {
  borderRadius: 15,
  height: "90%",
  overflow: "hidden",
}

const CAMERA: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const VISION_RECT: ViewStyle = {
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: color.palette.hotpink,
}

export interface CameraScreenProps extends NavigationScreenProps<{}> {}

export const CameraScreen: React.FunctionComponent<CameraScreenProps> = props => {
  const camera = React.useRef<RNCamera>()

  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const [visionData, setVisionData] = React.useState([])
  const [cameraLayout, setCameraLayout] = React.useState<LayoutRectangle>()

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

  const testTakePicture = React.useMemo(
    () => async () => {
      if (!camera.current || !cameraLayout) return

      const data = await camera.current.takePictureAsync(PICTURE_OPTIONS)

      if (!data.uri) {
        return
      }

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
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View>
          <Header
            leftIcon="signout"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={CAMERA_BORDER} onLayout={(e)=> setCameraLayout(e.nativeEvent.layout)}>
            <Camera
              ref={camera}
              key="camera"
              style={CAMERA}
              notAuthorizedView={null}
              playSoundOnCapture
            />
            {visionData.map(item => (
              <TouchableOpacity style={[VISION_RECT, item.position]} key={item.text} >
                <Text>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Screen>

      <SafeAreaView>
        <View style={FOOTER_CONTENT}>
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="expenseScreen.takePicture"
            onPress={testTakePicture}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
