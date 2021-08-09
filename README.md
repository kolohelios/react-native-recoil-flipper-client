# react-native-recoil-flipper-client

## Important Notes

* This state provider client requires that the [flipper-plugin-react-native-recoil
](https://www.npmjs.com/package/flipper-plugin-react-native-recoil
) plugin be installed within your desktop Flipper client application in order to work.
* State reporting functionality may be relying on experimental or unstable Recoil hooks.

## Requires

* React Native
* Recoil

## Installation

Make sure you NPM install `react-native-flipper` in addition to this client. (e.g. `npm i --save react-native-recoil-flipper-client react-native-flipper`). Although Flipper support is enabled in React Native by default, the functionality provided by react-native-flipper is not.

## Usage

Add this client to your React Native project by mounting it within your App JSX tree anywhere, but ideally immediately inside RecoilRoot.

To mount the client, you'll want to import the client (1) and use the JSX tag as follows:

```
import React from 'react';
import { RecoilRoot } from 'recoil';
import { RootRouter } from './route';
import { RecoilFlipperClient } from 'react-native-recoil-flipper-client'; (1)

function App() {
    return (
        <RecoilRoot>
            <RecoilFlipperClient /> (2)
            <RootRouter />
        </RecoilRoot>
    );
}

export default App;
```
Where RootRouter is your main App's entry point.

## Development

...

## Todo

- [ ] add supported Recoil version to README requires section
