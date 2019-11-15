import * as React from "react"
import { ViewStyle, TextStyle, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ExpenseCard } from "."

declare var module

const cardStyleArray: ViewStyle[] = [{ paddingVertical: 100 }, { borderRadius: 0 }]

const cardTextStyleArray: TextStyle[] = [{ fontSize: 20 }, { color: "#a511dc" }]

storiesOf("Card", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <ExpenseCard text="Click It" preset="primary" onPress={() => Alert.alert("pressed")} />
      </UseCase>
      <UseCase text="Disabled" usage="The disabled behaviour of the primary button.">
        <ExpenseCard text="Click It" preset="primary" onPress={() => Alert.alert("pressed")} disabled />
      </UseCase>
      <UseCase text="Array Style" usage="Button with array style">
        <ExpenseCard
          text="Click It"
          preset="primary"
          onPress={() => Alert.alert("pressed")}
          style={cardStyleArray}
          textStyle={cardTextStyleArray}
        />
      </UseCase>
    </Story>
  ))
