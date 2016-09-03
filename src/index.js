const identity = (x) => (x);
const always   = (x) => () => (x);

const isFunction  = (f) => !!(f && f.constructor && f.call && f.apply);
const isReducible = (a) => !!(a && (typeof a.reduce === 'function'));
const isThenable  = (p) => (typeof p.then === 'function');

/**
 * freduce: Function Reducer
 * 
 * Composes from left-to-right, so d(c(b(a(x)))) is
 * equivalent to freduce(a,b,c,d)(x)
 *
 * @param {...Function} A list of functions
 * @returns {Function} A composite function
 */
const freduce = (first, ...rest) => {
    if (!first) return identity;
    if (isReducible(first)) first = freduce(...first);
    if (!isFunction(first)) return always(first);
    if (!rest) return first;
    return (...params) => rest.reduce(
        reducer, 
        first(...params)
    );
};

export const reducer = (previousResult, freddy) => {
    const f = freduce(freddy);
    if (isThenable(previousResult)) return previousResult.then(f);
    
    return f(previousResult);
};

export default freduce;