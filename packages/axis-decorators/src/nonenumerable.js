import { decorate as _decorate } from "./lib";

function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

export default function nonenumerable(...args) {
  return _decorate(handleDescriptor, args);
}
