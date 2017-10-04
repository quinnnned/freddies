const identity = (x) => (x);
const always   = (x) => () => (x);

const isFunction  = (f) => !!(f && f.constructor && f.call && f.apply);
const isThenable  = (p) => (typeof p.then === 'function');
const isSimple    = (x) => (
    ( x === null)
    ||
    ( typeof x === 'string')
    ||
    ( typeof x === 'number')
    ||
    ( typeof x === 'boolean')
);

/**
 * toFun: Universal Function Composer
 * 
 * @param {...Function} A list of functionables
 * @returns {Function} A composite function
 */
const toFun = (...functionableList) => composeList(functionableList);

export const functionize = (functionable) => {
    if (functionable === undefined)  return identity;
    if (isFunction(functionable))    return functionable; 
    if (Array.isArray(functionable)) return composeList(functionable);
    if (isSimple(functionable))      return always(functionable);
    return composeMap(functionable);
};

export const composeMap = (functionableMap={}) => (input={}, ...rest) => (
    Object.keys(functionableMap).map( 
        (key) => ({
            [key]: functionize(functionableMap[key])(input[key], ...rest)
        })
    ).reduce( (fused, shard) => Object.assign(fused, shard), 
        Object.assign({}, input)
    )
);

export const composeList = (functionableList) => {
    const [first, ...rest] = functionableList;
    return (...params) => rest.reduce(
        reducer, 
        functionize(first)(...params)
    );
};

export const reducer = (previousResult, functionable) => {
    const f = functionize(functionable);
    if (isThenable(previousResult)) return previousResult.then(f);
    return f(previousResult);
};

export default toFun;