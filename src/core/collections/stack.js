import LinkedList from './linkedList';

class Stack {
  #count;

  constructor() {
    this.#count = 0;
    this.linkedList = new LinkedList();
  }

  get count() {
    return this.#count;
  }

  clear() {
    this.#count = 0;
    this.linkedList = new LinkedList();
  }

  peek() {
    return this.linkedList.last.value;
  }

  pop() {
    const { value } = this.linkedList.last;
    this.linkedList.removeLast();
    this.#count--;
    return value;
  }

  push(value) {
    this.linkedList.addLast(value);
    this.#count++;
  }

  tryPeek() {
    if (this.#count === 0) {
      return [false, null];
    }

    return [true, this.peek()];
  }

  tryPop() {
    if (this.#count === 0) {
      return [false, null];
    }

    return [true, this.pop()];
  }
}

export default Stack;
