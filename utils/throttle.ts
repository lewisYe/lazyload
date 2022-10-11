export default function throttle(fun: ()=> void, delay: number) {
  let timer: any;
  return function () {
      var args = arguments;
      if (!timer) {
          timer = setTimeout(() => {
              fun.apply(this, args);
              clearTimeout(timer);
              timer = null;
          }, delay);
      }
  }
}