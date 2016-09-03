import test from 'tape';
import freduce from '../src/';

test('freduce composes from left to right', (assert) => {

  // Arrange
  const concat = (a) => (b='') => (b+a); 

  // Act
  const compositeFunction = freduce(
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

test('freduce accepts a single array argument', (assert) => {

  // Arrange
  const concat = (a) => (b='') => (b+a); 
  const functionList = [
    concat('Left'), 
    concat('To'), 
    concat('Right')
  ];
  
  // Act
  const compositeFunction = freduce(functionList);
  const expected = 'LeftToRight';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("freduce can accept multiple array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const first  = [ concat('freduce'), concat(' can') ];
  const second = [ concat(' accept'), concat(' multiple'), concat(' array') ];
  const third  = [ concat(' arguments') ];
  
  // Act
  const compositeFunction = freduce(first, second, third);
  const expected = 'freduce can accept multiple array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});


test("freduce can accept mixed function and array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const a  = concat('freduce');
  const b  = [ concat(' can'), concat(' accept'), concat(' mixed') ];
  const c  = concat(' function');
  const d  = [ concat(' and'), concat(' array'), concat(' arguments') ];
  
  // Act
  const compositeFunction = freduce(a, b, c, d);
  const expected = 'freduce can accept mixed function and array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});


test("freduce can accept arbitrarily nested array arguments", (assert) => {
  
  // Arrange
  const concat = (a) => (b='') => (b+a);
  const nested = [ 
    concat('freduce'), [
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
  const compositeFunction = freduce(nested);
  const expected = 'freduce can accept arbitrarily nested array arguments';
  const actual = compositeFunction();
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test("freduce supports thenables (promises)", (assert) => {
  
  // Arrange
  const concatThen = (a) => (b='') => Promise.resolve(b+a);
  const thenables = [
    concatThen('freduce'),
    concatThen(' supports'),
    concatThen(' thenables'),
    concatThen(' (promises)')
  ];
  
  // Act
  const compositeFunction = freduce(thenables);
  const expected = 'freduce supports thenables (promises)';
  compositeFunction().then( (actual) => {
    
    // Assert
    assert.equal(actual, expected);
    assert.end();  
  });
});

test('freduce with no parameters returns identity', (assert) => {
  // Assert
  
  // Act
  const compositeFunction = freduce();
  const expected = 'whatever';
  const actual = compositeFunction(expected);
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});

test('freduce interprets non-function-non-array arguments as constant functions', (assert) => {
  // Assert
  const aConstantValue = "a constant value";
  
  // Act
  const compositeFunction = freduce(aConstantValue);
  const expected = aConstantValue;
  const actual = compositeFunction('ignored', 'parameters');
  
  // Assert
  assert.equal(actual, expected);
  assert.end();
});