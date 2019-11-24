# Expenses
An expense native app, created in React Native TypeScript with native Android writtent in Kotlin. 


# Screenshots
- [Pull# 25](https://github.com/louisgv/mobile-challenge/pull/25) 
- [Pull# 28](https://github.com/louisgv/mobile-challenge/pull/28) 

## Features:
- List expenses from API (serving on `localhost:3000`. Refers to run instruction below)
- Add comment on an expense
- Snap a receipt image for an existing expense. The app uses MLKit to parse text from the image and use that to score the validity of the image. (Simple token matching)
- Filter receipt
- Simple pagination
- Pinch/zoom image view using Fresco and PhotoView.

## Pre-req
- nodejs + npm
- yarn

## Installation:

```
cd api
npm i
cd ../PleoLouis
yarn
```

## Run instructions:

On one terminal, run:
```
cd api/
npm start
```

On another:
```
cd PleoLouis
yarn start
```

Then open the android studio project, and run the app. If nothing load, run `yarn adb` in `PleoLouis` to bridge the ports.

## General requirements
Multiple app screen application using ReactNative and Java/Kotlin/Swift: 
- A visually pleasing experience, you don’t have to be a designer but you must have put an effort into making this look good
- A "componentized" approach, split your code into small building blocks, showcase your clean architecture skills.
- Modules/Screens can be written on JS/TS but at least one should be native
- The use of any libraries or frameworks as long as you can explain to us why you chose them.
- A brief description of your project. How long did it take? Which part was the hardest to implement? What functionalities are you most proud of?

## Nice to have
Want to go the extra mile? Here's few suggestion of things we'd like to see (or go crazy and implement what you think will impress us).
- Implement with a state management library (Redux, Mobx, VueX, Graphql, ...)
- Implement solution in TypeScript
- Native modules using Kotlin/Swift
- Localization: support for multiple languages (English, French, ...)
- Between realms communication  (JS -> Native or Native -> JS). For example: Expense List (JS Realm) sends properties to next Fragment/ViewController (Native Realm) and this responds back to the (JS Realm) with some result

## What we're looking for
- Using high-quality existing libraries or small amounts of custom code. 
- Production grade code (clean, maintainable, reusable code)
- Showing your work through your commit history
- Polish and visual creativity
- Pride in craftsmanship

## Super important 👇
Please note that while you are free to use libraries of your choosing, we encourage you to write at least some your own code. This is your chance to really impress us with your skills.
