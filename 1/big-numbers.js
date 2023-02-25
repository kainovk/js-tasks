export function add(a, b) {
    let bigA = BigInt(a);
    let bigB = BigInt(b);
    return bigA + bigB;
}

export function sub(a, b) {
    let bigA = BigInt(a);
    let bigB = BigInt(b);
    return bigA - bigB;
}

export function mul(a, b) {
    let bigA = BigInt(a);
    let bigB = BigInt(b);
    return bigA * bigB;
}

export function div(a, b) {
    let bigA = BigInt(a);
    let bigB = BigInt(b);
    return bigA / bigB;
}