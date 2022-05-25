import LinkedListNode from './linkedListNode';

class LinkedList {
  #count;

  constructor() {
    this.head = null;
    this.#count = 0;
  }

  get count() {
    return this.#count;
  }

  get first() {
    return this.head;
  }

  get last() {
    return this.#count >= 2 ? this.head.prev : this.head;
  }

  addFirst(value) {
    const node = new LinkedListNode(value);

    if (this.#count === 0) {
      this.head = node;
    } else if (this.#count === 1) {
      node.next = this.head;
      node.prev = this.head;
      this.head = node;
    } else if (this.#count >= 2) {
      node.next = this.head;
      node.prev = this.head.prev;
      this.head = node;
    }

    // // [1] Points the new node's next to the head.
    // node.next = this.head;

    // if (this.head !== null) {
    //   // [2] Points the new node's prev to the head's prev.
    //   node.prev = this.#count >= 2 ? this.head.prev : this.head;

    //   // [3] Points the head's prev to the new node.
    //   this.head.prev = node;
    // }

    // // [4] Points the head to the new node.
    // this.head = node;

    this.#count++;
  }

  addLast(value) {
    const node = new LinkedListNode(value);

    // if (this.#count === 0) {
    //   this.head = node;
    //   this.#count++;
    // } else if (this.#count >= 1) {
    //   node.prev = this.head;
    //   this.head.prev = node;
    //   this.head.next = node;
    // } else if (this.#count >= 2) {
    //   node.prev = this.head.prev;
    //   this.head.prev.next = node;
    //   this.head.prev = node;
    // }

    if (this.#count === 0) {
      this.head = node;
    } else if (this.#count === 1) {
      this.head.prev = node;
      this.head.next = node;
      node.prev = this.head;
    } else if (this.#count >= 2) {
      node.prev = this.head.prev;
      this.head.prev.next = node;
      this.head.prev = node;
    }

    this.#count++;
  }

  removeFirst() {
    if (this.head !== null) {
      // [1] Points the head's next's prev to the head's prev.
      this.head.next.prev = this.head.prev;

      // [2] Points the head to the head's next.
      this.head = this.head.next;
    }

    this.#count--;
  }

  removeLast() {
    if (this.head !== null) {
      if (this.#count > 2) {
        // [1] Points the head's prev to the head's prev's prev.
        this.head.prev = this.head.prev.prev;

        // [2] Points the head's prev's next to null.
        this.head.prev.next = null;
      } else if (this.#count === 2) {
        this.head.next = null;
        this.head.prev = null;
      } else {
        this.head = null;
      }
    }

    this.#count--;
  }
}

export default LinkedList;
