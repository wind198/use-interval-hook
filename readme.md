# Use Interval hook
## Introduction
  This hook is allow trigger callback on interval in React with ease (which often cause a lot of pain relating to closures), also it return function that allow more control over how often the callback is called
## Example
```javascript
import useInterval from "use-interval-hook";

callback = ()=>{
  console.log("Hello world!");
}

const {
    pause,
    activate,
    stop,
    timeLapse,
  } = useInterval({
  interval: 1000;
  callback,
  delay: 2000;
  })


```