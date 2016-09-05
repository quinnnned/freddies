# freddies
The Zero-Dependency Left-To-Right Function Composer!

[![Build Status](https://travis-ci.org/quinnnned/freddies.svg?branch=master)](https://travis-ci.org/quinnnned/freddies)
[![npm version](https://img.shields.io/npm/v/freddies.svg?style=flat-square)](https://www.npmjs.com/package/freddies)
[![Coverage Status](https://coveralls.io/repos/github/quinnnned/freddies/badge.svg?branch=master)](https://coveralls.io/github/quinnnned/freddies?branch=master)

## What's A "Freddy"?  
That's a term I just made up for a process defined as array of functions! 

...it also comes from **F**unction-**Red**ucible Arra**y**

## Show Me!

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
// YES! Freddies are defined as ordered steps!
const myFreddy = [
    doFirstThing, 
    doSecondThing, 
    doThirdThing, 
    doLastThing
];

// Freddy to function!
const doSomeThings = f(myFreddy);

// And done!
const foo = doSomeThings(a, b, c);
```

#### Or Even Skip the Explicit Array Declaration!
```js
const doSomeThings = f(
    doFirstThing, 
    doSecondThing, 
    doThirdThing, 
    doLastThing
);

const foo = doSomeThings(a, b, c);
```

#### Got An Async Process?
Freddies understand promises!

```js
const findUserByName = (name) => { 
    return db.users.findOne({name}) 
};

const activateUser   = (user) => {
    user.activated = true;
    return user;
};

// Freddy to function!
const activateByName = f(findUserByName, activateUser, db.users.update);

// Invoke and catch errors like usual
activateByName('Fred').catch(errorHandler);

```

#### Got a Complex Multi-Stage Process?
Freddies can contain other freddies!
```js
const access = [readSession, checkPermissions ]
const sanitizeForm = [ sanitizeXss, sanitizeSqlInject ]
const validateForm = [ checkNonce, validateComment]
const clean  = [sanitizeForm, validateForm];
// clearly-defined flow 
on('add-comment', f(
    access,
    clean,
    db.comments.insert,
    respondOk
)).catch(respondWithError);

```


## Shut up and take my money!

Installation (npm):
```
npm install --save freddies
```

For the ```import```-ers:
```js
import f from 'freddies';
```

For the ```require```-ers:
```js
var f = require('freddies').default;
```
