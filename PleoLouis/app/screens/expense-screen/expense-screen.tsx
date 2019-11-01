import * as React from "react"
import {
  SafeAreaView,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"

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

export interface ExpenseScreenProps extends NavigationScreenProps<{}> {}

export const ExpenseScreen: React.FunctionComponent<ExpenseScreenProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  const goToCameraScreen = React.useMemo(() => () => props.navigation.navigate("camera"), [props.navigation])

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
        </View>
      </Screen>

      <SafeAreaView>
        <View style={FOOTER_CONTENT}>
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="expenseScreen.takePicture"
            onPress={goToCameraScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
