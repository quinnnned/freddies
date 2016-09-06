import test from 'tape';
import freddies from '../src/';

test('freddies composes from left to right', (assert) => {

  // Arrange
  const concat = (a) => (b='') => (b+a); 

  // Act
  const compositeFunction = freddies(
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

test('freddies accepts a single array argument', (assert) => {

  // Arrange
  const concat = (a) => (b='') => (b+a); 
  const functionList = [
    concat('Left'), 
    concat('To'), 
    concat('Right')
  ];
  
  // Act
  const compositeFunction = freddies(functionList);
  const expected = 'LeftToRight';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("freddies can accept multiple array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const first  = [ concat('freddies'), concat(' can') ];
  const second = [ concat(' accept'), concat(' multiple'), concat(' array') ];
  const third  = [ concat(' arguments') ];
  
  // Act
  const compositeFunction = freddies(first, second, third);
  const expected = 'freddies can accept multiple array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});


test("freddies can accept mixed function and array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const a  = concat('freddies');
  const b  = [ concat(' can'), concat(' accept'), concat(' mixed') ];
  const c  = concat(' function');
  const d  = [ concat(' and'), concat(' array'), concat(' arguments') ];
  
  // Act
  const compositeFunction = freddies(a, b, c, d);
  const expected = 'freddies can accept mixed function and array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});


test("freddies can accept arbitrarily nested array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const nested = [ 
    concat('freddies'), [
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
  const compositeFunction = freddies(nested);
  const expected = 'freddies can accept arbitrarily nested array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("freddies supports thenables (promises)", (assert) => {
  
  // Arrange
  const concatThen = (a) => (b='') => Promise.resolve(b+a);
  const thenables = [
    concatThen('freddies'),
    concatThen(' supports'),
    concatThen(' thenables'),
    concatThen(' (promises)')
  ];
  
  // Act
  const compositeFunction = freddies(thenables);
  const expected = 'freddies supports thenables (promises)';
  compositeFunction().then( (actual) => {
    
    // Assert
    assert.equal(actual, expected);
    assert.end();  
  });
});

test('freddies with no parameters returns identity', (assert) => {
  // Arrange
  
  // Act
  const compositeFunction = freddies();
  const expected = 'whatever';
  const actual = compositeFunction(expected);
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test('freddy composes objects as branched functions', (assert) => {
  // Arrange
  const input = {a:1, b:'hello', c:true};
  const objectFreddy = {
    a: (x) => (x + 1), 
    b: (x) => (x +' world'), 
    c: (x) => (!x)
  };
  
  // Act
  const compositeFunction = freddies(objectFreddy);
  const actual = compositeFunction(input);
  const expected = {a:2, b:'hello world', c:false};
  
  // Assert
  assert.deepEqual(actual, expected);
  assert.end();
});

test('object freddies compose as pure functions', (assert) => {

  // Arrange
  const freddy = {};
  const input = {a:1, b:'hello', c:true};
  
  // Act
  const compositeFunction = freddies(freddy);
  const output = compositeFunction(input);
  
  // Assert
  assert.isNot(output, input);
  assert.deepEqual(output, input);
  assert.end();
});


test('freddies interprets non-function-non-array-non-object arguments as constant functions', (assert) => {
  // Arrange
  const aConstantValue = "a constant value";
  
  // Act
  const compositeFunction = freddies(aConstantValue);
  const expected = aConstantValue;
  const actual = compositeFunction('ignored', 'parameters');
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});
