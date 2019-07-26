/**
 * $custom_decorator
 * 用于标记属性是否需要进行单页或全局存储,
 *
 * @export
 * @param {string} [type="singlePage" || "global"]
 * @returns
 */
import { decorate } from "./lib";

function handleDescriptor(target, key, descriptor, [type]) {
    if (type == "singlePage") {
        if (!target.__persistencePair__) {
            // 将这个隐藏属性定义成 not enumerable，遍历的时候是取不到的。
            Object.defineProperty(target, "__persistencePair__", {
                value: [],
                enumerable: false,
                writeable: true,
                configurable: true
            });
        }
        target.__persistencePair__.push(key);
    } else if (type == "global") {
        if (!target.__persistenceAppPair__) {
            Object.defineProperties(target, "__persistenceAppPair__", {
                value: [],
                enumerable: false,
                writeable: true,
                configurable: true
            });
        }
        target.__persistenceAppPair__.push(key);
    }

    return descriptor;
}

export default function persistence(type = "singlePage") {
    return decorate(handleDescriptor, [type]);
}
