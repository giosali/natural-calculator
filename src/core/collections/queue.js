import LinkedList from './linkedList';

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  get count() {
    return this.linkedList.count;
  }

  clear() {
    this.linkedList = new LinkedList();
  }

  dequeue() {
    const { value } = this.linkedList.first;
    this.linkedList.removeFirst();
    return value;
  }

  enqueue(value) {
    this.linkedList.addLast(value);
  }

  peek() {
    return this.linkedList.first.value;
  }

  toArray() {
    const array = [];

    if (this.count === 0) {
      return array;
    }

    if (this.count === 1) {
      array.push(this.linkedList.first.value);
      return array;
    }

    let node = this.linkedList.first;
    while (node !== this.linkedList.last) {
      array.push(node.value);
      node = node.next;
    }

    array.push(this.linkedList.last.value);
    return array;
  }
}

export default Queue;
