//截流函数  单位时间内最多请求一次
export function throttle(fn: Function, wait: number) {
    let date = 0
    return function(...args: any) {
        const now = Date.now()
        if (now - date > wait) {
            fn(args)
            date = now
        }
    }
}