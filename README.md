# react-spring-dnd

A deadly simple drag and drop solution using react-spring

[![npm](https://img.shields.io/npm/v/react-spring-dnd.svg?style=flat-square)](https://www.npmjs.com/package/react-spring-dnd)
[![npm](https://img.shields.io/npm/dt/react-spring-dnd?style=flat-square)](https://www.npmtrends.com/react-spring-dnd)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-spring-dnd?style=flat-square)](https://bundlephobia.com/result?p=react-spring-dnd)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-spring-dnd/peer/react?style=flat-square)](https://github.com/facebook/react)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-spring-dnd/peer/react-router?style=flat-square)](https://github.com/ReactTraining/react-router)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/react-spring-dnd?style=flat-square)](https://github.com/nanxiaobei/react-spring-dnd/blob/master/LICENSE)

## Add

```shell script
yarn add react-spring-dnd

# or

npm i react-spring-dnd
```

## Use

```jsx
import SpringList from 'react-spring-dnd';

const App = () => <SpringList> {'hello react spring dnd'.split(' ')}</SpringList>;
```

## Try

[Play a live demo here → 🤳](https://codesandbox.io/s/react-spring-dnd-bnzlu)

## API

| Prop        | Type       | Default | Description                                          |
| ----------- | ---------- | ------- | ---------------------------------------------------- |
| `row`       | `boolean`  | `false` | Show list in column or row view, default column view |
| `onDragEnd` | `function` | -       | onDragEnd callback, `(order)=> void`                 |
| `children`  | `array`    | `[]`    | An array of draggable items                          |

## License

[MIT License](https://github.com/nanxiaobei/react-spring-dnd/blob/master/LICENSE) © [nanxiaobei](https://mrlee.me/)
