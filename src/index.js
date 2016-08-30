const identity = (x) => (x);

/**
 * freduce: Function Reducer
 * 
 * Composes from left-to-right, so d(c(b(a(x)))) is
 * equivalent to freduce(a,b,c,d)(x)
 *
 * @param {...Function} A list of functions
 * @returns {Function} A composite function
 */
const freduce = (firstFunction, ...otherFunctions) => {
    if (!firstFunction) return identity;
    if (!otherFunctions.length) return firstFunction;
    
    return (...params) => otherFunctions.reduce(
        (x, f) => f(x), 
        firstFunction(...params)
    );
};

export default freduce;