<div align="center">
<p><a href="https://kee.so/" target="_blank"><img src="https://i.imgur.com/x5SRUoo.png" alt="kee.so" /></a></p>

Create now ➫ [🔗 kee.so](https://kee.so/)

</div>

---

# react-spring-dnd 🕊

A deadly simple drag and drop solution using react-spring

[![npm](https://img.shields.io/npm/v/react-spring-dnd.svg?style=flat-square)](https://www.npmjs.com/package/react-spring-dnd)
[![npm](https://img.shields.io/npm/dt/react-spring-dnd?style=flat-square)](https://www.npmtrends.com/react-spring-dnd)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-spring-dnd?style=flat-square)](https://bundlephobia.com/result?p=react-spring-dnd)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/react-spring-dnd/peer/react?style=flat-square)](https://github.com/facebook/react)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/react-spring-dnd?style=flat-square)](https://github.com/nanxiaobei/react-spring-dnd/blob/main/LICENSE)

---

## Play

[![Edit react-spring-dnd](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-spring-dnd-lnz70?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.jsx)

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

## API

| Prop        | Type       | Default | Description                                 |
| ----------- | ---------- | ------- | ------------------------------------------- |
| `row`       | `boolean`  | `false` | Display as row                              |
| `onDragEnd` | `function` | -       | `onDragEnd` callback, `(orderList) => void` |
| `children`  | `array`    | `[]`    | Draggable items                             |

## License

[MIT License](https://github.com/nanxiaobei/react-spring-dnd/blob/main/LICENSE) © [nanxiaobei](https://lee.so/)
