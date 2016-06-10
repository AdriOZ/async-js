# async-js
Execute async functions in the browser

It consists in a simple function called *async*. The function accept two parameters:
- \"fn\": The functions or functions that will be executed.
- \"wait\": If true, the array of functions will be executed in order. This is useful when the functions manipulate data and one or more of the functions need that data to be manipulated before working with it.

In the folder *examples*, several use cases are shown:

## Example 1
The example shows the execution of a single function:
```js
console.log('Start');

async(function() {
    console.log('The function is called');
});

console.log('End');
```
The result is:
- Start
- End
- The function is called

## Example 2
Executing several functions:
```js
async([
    function() {
        console.log('Function 1');
    },
    function() {
        console.log('Function 2');
    },
    function() {
        console.log('Function 3');
    },
    function() {
        console.log('Function 4');
    }
]);
```
The result is:
- Function 1
- Function 2
- Function 3
- Function 4

## Example 3
Executing several functions in a queue:
```js
var counter = 0;

async([
    function() {
        ++counter;      // counter = 1
    },
    function() {
        counter *= 10;  // counter = 10
    },
    function() {
        counter -= 1;   // counter = 9
    },
    function() {
        console.log(counter);
    }
], true);
```
The result is 9

## Example 4
Executing several queues of functions:
```js
var counter = 0;

async([
    function() {
        ++counter;      // counter = 1
    },
    function() {
        counter *= 10;  // counter = 10
    },
    function() {
        counter -= 1;   // counter = 9
    },
    function() {
        console.log(counter);
    }
]);

async([
    function() {
        counter *= 2;   // counter = 18
    },
    function() {
        console.log(counter);
    }
]);
```
The result is 18

## Example 5
Executing two queues. One of them is executed in order:
```js
var counter = 0;

async([
    function() {
        ++counter;
        console.log('Queue 1, Function 1');
    },
    function() {
        counter *= 10;
        console.log('Queue 1, Function 2');
    },
    function() {
        counter -= 1;
        console.log('Queue 1, Function 3');
    },
    function() {
        console.log(counter);
    }
], true);

async([
    function() {
        console.log('Queue 2, Function 1');
        counter *= 2;   // counter = 18
    },
    function() {
        console.log(counter);
    }
]);
```
The result *is not* 18, but it is *19*. In fact, the logs are called in this order:
- Queue 1, Function 1
- Queue 2, Function 1
- 2
- Queue 1, Function 2
- Queue 1, Function 3
- 19

## That's all
Have fun ;)
