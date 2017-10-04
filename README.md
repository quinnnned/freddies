# to-fun
Advanced Left-To-Right Function Composer

[![Build Status](https://travis-ci.org/quinnnned/to-fun.svg?branch=master)](https://travis-ci.org/quinnnned/to-fun)
[![npm version](https://img.shields.io/npm/v/to-fun.svg?style=flat-square)](https://www.npmjs.com/package/to-fun)
[![Coverage Status](https://coveralls.io/repos/github/quinnnned/to-fun/badge.svg?branch=master)](https://coveralls.io/github/quinnnned/to-fun?branch=master)

## Better Function Composition

#### Don't Do This:
```js
// NO! Pyramid of DOOM! Reversed Process Order!
const foo = doLastThing(
                doThirdThing(
                    doSecondThing(
                        doFirstThing(a, b, c)
                    )
                )
           );
```

#### Do This Instead!
```js
// YES! Clear, Ordered Steps!
const thingsToDo = [
    doFirstThing, 
    doSecondThing, 
    doThirdThing, 
    doLastThing
];

// To Function!
const doSomeThings = toFun(thingsToDo);

// And Done!
const foo = doSomeThings(a, b, c);
```

#### Or Even Skip the Explicit Array Declaration!
```js
const doSomeThings = toFun(
    doFirstThing, 
    doSecondThing, 
    doThirdThing, 
    doLastThing
);

const foo = doSomeThings(a, b, c);
```

#### Got An Async Process?
`to-fun` understands promises!

```js
const findUserByName = (name) => { 
    return db.users.findOne({name}) 
};

const activateUser = (user) => ({
    ...user,
    activated: true
});

// To Function!
const activateByName = toFun(findUserByName, activateUser, db.users.update);

// Invoke and catch errors like usual
activateByName('Jesse').catch(errorHandler);

```

#### Got a Complex Multi-Stage Process?
`to-fun` supports nested composition!
```js
const access = [readSession, checkPermissions ]
const sanitizeForm = [ sanitizeXss, sanitizeSqlInject ]
const validateForm = [ checkNonce, validateComment]
const clean  = [sanitizeForm, validateForm];
// clearly-defined flow 
on('add-comment', toFun(
    access,
    clean,
    db.comments.insert,
    respondOk
)).catch(respondWithError);

```


## Shut up and take my money!

Installation (npm):
```
npm install --save to-fun
```

For the ```import```-ers:
```js
import f from 'to-fun';
```

For the ```require```-ers:
```js
var f = require('to-fun').default;
```
