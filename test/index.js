import test from 'tape';
import toFun from '../src/';

test('toFun composes from left to right', (assert) => {

  // Arrange
  const concat = (a) => (b='') => (b+a); 

  // Act
  const compositeFunction = toFun(
    concat('Left'), 
    concat('To'), 
    concat('Right')
  );
  const expected = 'LeftToRight';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test('toFun accepts a single array argument', (assert) => {

  // Arrange
  const concat = (a) => (b='') => (b+a); 
  const functionList = [
    concat('Left'), 
    concat('To'), 
    concat('Right')
  ];
  
  // Act
  const compositeFunction = toFun(functionList);
  const expected = 'LeftToRight';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("toFun can accept multiple array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const first  = [ concat('toFun'), concat(' can') ];
  const second = [ concat(' accept'), concat(' multiple'), concat(' array') ];
  const third  = [ concat(' arguments') ];
  
  // Act
  const compositeFunction = toFun(first, second, third);
  const expected = 'toFun can accept multiple array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("toFun can accept mixed function and array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const a  = concat('toFun');
  const b  = [ concat(' can'), concat(' accept'), concat(' mixed') ];
  const c  = concat(' function');
  const d  = [ concat(' and'), concat(' array'), concat(' arguments') ];
  
  // Act
  const compositeFunction = toFun(a, b, c, d);
  const expected = 'toFun can accept mixed function and array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("toFun can accept arbitrarily nested array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const nested = [ 
    concat('toFun'), [
      concat(' can'), [
        concat(' accept'), [
          concat(' arbitrarily'), [
            concat(' nested'), [
              concat(' array'), [
                concat(' arguments')
              ]
            ]
          ]
        ]
      ]
    ]
  ];
  
  // Act
  const compositeFunction = toFun(nested);
  const expected = 'toFun can accept arbitrarily nested array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("toFun supports thenables (promises)", (assert) => {
  
  // Arrange
  const concatThen = (a) => (b='') => Promise.resolve(b+a);
  const thenables = [
    concatThen('toFun'),
    concatThen(' supports'),
    concatThen(' thenables'),
    concatThen(' (promises)')
  ];
  
  // Act
  const compositeFunction = toFun(thenables);
  const expected = 'toFun supports thenables (promises)';
  compositeFunction().then( (actual) => {
    
    // Assert
    assert.equal(actual, expected);
    assert.end();  
  });
});

test('toFun with no parameters returns identity', (assert) => {
  // Arrange
  
  // Act
  const compositeFunction = toFun();
  const expected = 'whatever';
  const actual = compositeFunction(expected);
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test('functionable composes objects as branched functions', (assert) => {
  // Arrange
  const input = {a:1, b:'hello', c:true};
  const objectfunctionable = {
    a: (x) => (x + 1), 
    b: (x) => (x +' world'), 
    c: (x) => (!x)
  };
  
  // Act
  const compositeFunction = toFun(objectfunctionable);
  const actual = compositeFunction(input);
  const expected = {a:2, b:'hello world', c:false};
  
  // Assert
  assert.deepEqual(actual, expected);
  assert.end();
});

test('object toFun compose as pure functions', (assert) => {

  // Arrange
  const functionable = {};
  const input = {a:1, b:'hello', c:true};
  
  // Act
  const compositeFunction = toFun(functionable);
  const output = compositeFunction(input);
  
  // Assert
  assert.isNot(output, input);
  assert.deepEqual(output, input);
  assert.end();
});

test('object toFun should pass all function parameters to each branch', (assert) => {
  // Arrange
  const input = {a:'foo', b:'bar', c:'baz'};
  const suffixer = (text, suffix) => text+suffix;
  const functionable = {a:suffixer, b:suffixer, c:suffixer};
  
  // Act
  const compositeFunction = toFun(functionable);
  const actual = compositeFunction(input, '!');
  const expected = {a:'foo!', b:'bar!', c:'baz!'};
  
  // Assert
  assert.deepEqual(actual, expected);
  assert.end();
});


test('a branch of an object functionable should be executed, even if no input is supplied to that branch', (assert) => {
    // Arrange
    const input = {};
    const functionable = { a: (x='foo') => x, b: (x=2) => x, c: (x=true) => x };
    
    // Act
    const compositeFunction = toFun(functionable);
    const actual = compositeFunction(input);
    const expected = {a:'foo', b:2, c:true};
    
    // Assert
    assert.deepEqual(actual, expected);
    assert.end();
});

test('properties of functionable input objects that do not have branches in that functionable are passed through unchanged', (assert) => {
    // Arrange
    const emptyObject = {};
    const input = {emptyObject, aBool: true, aString: 'aString'};
    const functionable = {};
    
    // Act
    const compositeFunction = toFun(functionable);
    const actual = compositeFunction(input);
    
    // Assert
    assert.equal(actual.emptyObject, input.emptyObject);
    assert.equal(actual.aBool, input.aBool);
    assert.equal(actual.aString, input.aString);
    assert.end();
});

test('toFun interprets non-function-non-array-non-object arguments as constant functions', (assert) => {
  // Arrange
  const aConstantValue = "a constant value";
  
  // Act
  const compositeFunction = toFun(aConstantValue);
  const expected = aConstantValue;
  const actual = compositeFunction('ignored', 'parameters');
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});