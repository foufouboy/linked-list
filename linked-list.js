function LinkedList() {
    let head = null;

    const listIsEmpty = () => {
        return head === null;
    }

    const runOnAll = (fn, acc = null) => {
        let currentNode = head;
        let i = 0;

        while (currentNode !== null) {
            acc = fn(currentNode, acc, i) || acc;
            currentNode = currentNode.next;
            i++;
        }

        return acc;
    }

    const append = (value) => {
        // O(N)
        const newNode = Node(value);

        if (listIsEmpty()) {
            head = newNode;
        } else {
            const tail = runOnAll((node) => {
                if (!node.next) {
                    return node;
                }
            });
            
            tail.next = newNode;
        }
    }

    const prepend = (value) => {
        // O(1)
        const newNode = Node(value);

        if (listIsEmpty()) {
            head = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }
    }

    const size = () => {
        // O(N)
        return runOnAll((_, acc) => ++acc, 0)
    }

    const at = (index) => {
        // O(N)
        return runOnAll((node, _, i) => {
            if (i === index) {
                return node;
            }
        });
    }

    const pop = () => {
        if (!head) {
            return null;
        } else if (!head.next) {
            head = null;
        } else {
            runOnAll((node) => {
                if (!node.next.next) {
                    node.next = null;
                }
            });
        }
    }

    const contains = (value) => {
        return runOnAll((node) => {
            if (node.value === value) {
                return true;
            } 
        }, false);
    }

    const find = (value) => {
        return runOnAll((node, res, i) => {
            if (node.value === value && 
                typeof res !== "number") {
                return i;
            } 
        }, null);
    }

    const removeAt = (index) => {
        if (index === 0) head = head.next;
        if (index >= size()) return null;

        runOnAll((node, _, i) => {
            if (i === index - 1) {
                if (node.next) {
                    node.next = node.next.next;
                }
            }
        });
    }

    const insertAt = (value, index) => {
        if (index >= size()) return null;
        if (index === 0) {
            const tmp = head;
            head = Node(value);
            head.next = tmp;
        }

        runOnAll((node, _, i) => {
            if (i === index - 1) {
                const tmp = node.next;
                node.next = Node(value);
                node.next.next = tmp;
            }
        })
    }

    const toString = () => {
        const output = runOnAll((node, text) => {
            return node.next === null ? 
                text + `(${node.value})` :
                text + `(${node.value}) => `;
        }, "");
        console.log(output);
    }

    function Node(value) {
        return {value, next: null};
    }

    return {
        size,
        prepend,
        append,
        toString, 
        at, 
        pop, 
        find, 
        removeAt, 
        insertAt, 
        contains,
        get head() {
            return head;
        },
        get tail() {
            let currentNode = head;

            runOnAll(node => {
                if (node.next === null) {
                    currentNode = node;
                }
            });

            return currentNode;
        }
    }
}
