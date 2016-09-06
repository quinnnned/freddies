const identity = (x) => (x);
const always   = (x) => () => (x);
const isFunction  = (f) => !!(f && f.constructor && f.call && f.apply);
const isThenable  = (p) => (typeof p.then === 'function');
const hasKeys     = (o) => !!(Object.keys(o).length);
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
 * freduce: Function Reducer
 * 
 * Composes from left-to-right, so d(c(b(a(x)))) is
 * equivalent to freduce(a,b,c,d)(x)
 *
 * @param {...Function} A list of functions
 * @returns {Function} A composite function
 */
const freduce = (...freddies) => composeList(freddies);

export const functionize = (freddy) => {
    if (freddy === undefined)  return identity;
    if (isFunction(freddy))    return freddy; 
    if (Array.isArray(freddy)) return composeList(freddy);
    if (isSimple(freddy))      return always(freddy);
    return composeMap(freddy);
};

export const composeMap = (freddyMap) => (input, ...rest) => {
    const results = Object.keys(input).map( 
        (inputKey) => ({
            [inputKey]: functionize(freddyMap[inputKey])(input[inputKey], ...rest)
        })
    );
    
    // TODO: Check for thenables
    
    return results.reduce( (fused, shard) => Object.assign(fused, shard), {});
};

export const composeList = (freddyList) => {
    const [first, ...rest] = freddyList;
    return (...params) => rest.reduce(
        reducer, 
        functionize(first)(...params)
    );
};

export const reducer = (previousResult, freddy) => {
    const f = freduce(freddy);
    if (isThenable(previousResult)) return previousResult.then(f);
    return f(previousResult);
};

export default freduce;