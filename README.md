# Lazyload

Lazyload your Components, Images or anything matters the performance.

## Installation

```
npm install --save Lazyload
```


## Usage

```jsx
import LazyLoad from "Lazyload";


const source = [
  'https://xxx.webp',
  'https://xxx.png'
]

const defaultSource = 'https://xx.jpg'


export default function IndexPage() {
 
  return (
    <div>
      <div style={{ height: 1000}}></div>
      <div id="demo" style={{ border: '1px solid red' , overflowY: 'scroll'}}>
        <LazyLoad height={500} scrollContainer={'#hhhhh'}>
          <div style={{ height: 1000}}></div>
          <div style={{ width: 500, height: 500, background: 'red'}}></div>
        </LazyLoad>
      </div>
      <LazyLoad height={500}>
        <div style={{ width: 500, height: 500, background: 'red'}}></div>
      </LazyLoad>
      <div style={{ height: 1000}}></div>
      <LazyLoad.Img width={500} height={500} source={source} defaultSource={defaultSource}/>
    </div>
  );
}

```

## Props

```js
LazyLoadProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
  styles?: object;
  scrollContainer?: string;
}


LazyLoadImgProps {
  defaultSource: string;
  width?: number;
  height?: number;
  source?: string[];
  styles?: object;
  scrollContainer?: string;
}
```