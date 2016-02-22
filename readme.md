# royal-sampler

For self-sampling code.

![The Simpsons - Royal Sampler](https://pbs.twimg.com/profile_images/1529241531/homer-poker_400x400.jpg)

## Show your sorcery
```javascript
import {execute} from 'royal-sampler'

function mySweetFunction () {
  return 'sweet';
}

let sampledFunction = execute(mySweetFunction).every(2).calls();
console.log(sampledFunction()); //undefined
console.log(sampledFunction()); //sweet

console.log(sampledFunction()); //undefined
console.log(sampledFunction()); //sweet
```

You can be slightly more DSL about it.

```javascript
execute(mySweetFunction).every().call();
execute(mySweetFunction).every(5).calls();
```

## What about time based sampling?

If your callback accepts a delta as the first parameter, then you can use a second set of helpers to have your code execute a set number of times per period.

```javascript
function mySweetFunction (delta) {
  return 'sweet';
}

execute(mySweetFunction).every().millisecond();
execute(mySweetFunction).every().second();
execute(mySweetFunction).every().minute();
execute(mySweetFunction).every().hour();
execute(mySweetFunction).every(234).milliseconds();
execute(mySweetFunction).every(25).seconds();
execute(mySweetFunction).every(33).minutes();
execute(mySweetFunction).every(5).hours();

execute(mySweetFunction).about(1).timesPer.second();
execute(mySweetFunction).about(4).timesPer.minute();
var sampled = execute(mySweetFunction).about(7).timesPer.hour();

sampled(45);
```

## Do I have to call my function
Yes. This package does not do any scheduling.


## Is the delta important
Yes. We use that to determine when to call your function. If you said 1 time per second, after the sum of the delta reaches 1000, your code executes.


## What about other variables
All variables get passed through to your function
```javascript
function myFunction (delta, a, b, c) {
	console.log(a, b, c);
}

var sampled = execute(myFunction).every().second();
sampled(15, 1, 2, 3); // 1, 2, 3
```


## Does it ensure my code executes?
No, this code is for _sampling_, not for _scheduling_. Put your code in a place where it will be call frequently. `requestAnimationFrame` and `setInterval` are good places to start.

# Authors
- [Ryan Boucher](https://github.com/distributedlife)

# License
[MIT](https://tldrlegal.com/license/mit-license)