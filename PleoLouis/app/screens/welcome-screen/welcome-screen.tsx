import * as React from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"

import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Screen } from "../../components/screen"
import { color, spacing } from "../../theme"
import Logo from "./pleo-logo.svg"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: "Roboto",
}

const TITLE: TextStyle = {
  ...TEXT,
  fontWeight: "100",
  fontSize: 36,
  lineHeight: 54,
  textAlign: "center",
}

const SUBTITLE: TextStyle = {
  ...TITLE,
  color: color.palette.hotpink
}

const LOGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
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

const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("expense"), [
    props.navigation,
  ])

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="fixed">
        <Logo style={LOGO}/>
        <Text style={TITLE} preset="header" tx="welcomeScreen.expense" />
        <Text style={SUBTITLE} preset="header" tx="welcomeScreen.simplified" />
      </Screen>
      <SafeAreaView>
        <View style={FOOTER_CONTENT}>
          <Button
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
