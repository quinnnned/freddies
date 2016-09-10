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
 * freddies: Universal Function Composer
 * 
 * @param {...Function} A list of freddies
 * @returns {Function} A composite function
 */
const freddies = (...freddyList) => composeList(freddyList);

export const functionize = (freddy) => {
    if (freddy === undefined)  return identity;
    if (isFunction(freddy))    return freddy; 
    if (Array.isArray(freddy)) return composeList(freddy);
    if (isSimple(freddy))      return always(freddy);
    return composeMap(freddy);
};

export const composeMap = (freddyMap={}) => (input={}, ...rest) => (
    Object.keys(freddyMap).map( 
        (key) => ({
            [key]: functionize(freddyMap[key])(input[key], ...rest)
        })
    ).reduce( (fused, shard) => Object.assign(fused, shard), 
        Object.assign({}, input)
    )
);

export const composeList = (freddyList) => {
    const [first, ...rest] = freddyList;
    return (...params) => rest.reduce(
        reducer, 
        functionize(first)(...params)
    );
};

export const reducer = (previousResult, freddy) => {
    const f = functionize(freddy);
    if (isThenable(previousResult)) return previousResult.then(f);
    return f(previousResult);
};

export default freddies;