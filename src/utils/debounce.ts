export const debounce = (fn: Function, ms: number) => {
    let timeout: any;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args)
        }, ms)
    }
}