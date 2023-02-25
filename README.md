# react-spring-dnd 🕊

A deadly simple drag and drop solution using react-spring

[![npm](https://img.shields.io/npm/v/react-spring-dnd.svg?style=flat-square)](https://www.npmjs.com/package/react-spring-dnd)
[![npm](https://img.shields.io/npm/dt/react-spring-dnd?style=flat-square)](https://www.npmtrends.com/react-spring-dnd)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-spring-dnd?style=flat-square)](https://bundlephobia.com/result?p=react-spring-dnd)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-spring-dnd/peer/react?style=flat-square)](https://github.com/facebook/react)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/react-spring-dnd?style=flat-square)](https://github.com/nanxiaobei/react-spring-dnd/blob/main/LICENSE)

---

## Install

```shell
pnpm add react-spring-dnd
# or
yarn add react-spring-dnd
# or
npm i react-spring-dnd
```

## Usage

```jsx
import SpringList from 'react-spring-dnd';

const App = () => {
  return (
    <SpringList>
      {'hello react spring dnd 👋⚛️🌀🦥'.split(' ').map((item) => (
        <div key={item}>{item}</div>
      ))}
    </SpringList>
  );
};
```

[![Edit react-spring-dnd](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-spring-dnd-lnz70?fontsize=14&hidenavigation=1&theme=dark)

## API

| Prop        | Type       | Default | Description                             |
| ----------- | ---------- | ------- | --------------------------------------- |
| `row`       | `boolean`  | `false` | Display as row                          |
| `onDragEnd` | `function` | -       | `onDragEnd` callback, `(order) => void` |
| `children`  | `array`    | `[]`    | Draggable items                         |

## License

[MIT License](https://github.com/nanxiaobei/react-spring-dnd/blob/main/LICENSE) © [nanxiaobei](https://lee.so/)

## FUTAKE

Try [**FUTAKE**](https://sotake.com/futake) in WeChat. A mini app for your inspiration moments. 🌈

![FUTAKE](https://s3.bmp.ovh/imgs/2022/07/21/452dd47aeb790abd.png)
