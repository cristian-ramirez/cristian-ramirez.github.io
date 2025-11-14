---
title: "Node.js: Stream"
date: 2025/11/14
description: "This entry is inspired in personal experience in interview processes, in one I was coded a small function to read and parse a large string that was loaded from a stream object; the second part is based on an interview where the code challenge was about to implement a function to solve Prefix Notation/Polish Notation"
---

# Node.js: Stream

## Context:

During a recruiting process, I received a code challenge where the idea was parsing and manipulate a big json list of
object from a Node.js streaming object; my solution was simple and flat, waited to receive the full object and start
working over it; but later in next interview round, the interviewer told me <i>«your solution works fine, do you think
that it could be improved it? what about implementing a function that start manipulating the list as receive the
chunks?»</i>, that question makes me wonder how do that, then I remembered (second part of the post) in other interview
process requested me to implement a function to returns the value of a string using Polish Notation, so <i>is the Polish
Notation an answer?</i>, <i>how it should look like?</i>.

Here is my implementation...

### What are streams in Node.js?

Streams is a collection data, like a regular arrays or strings; but differed of them because streams are not necessarily
loaded in memory at once, this property makes it powerful option when we need to work with big data structures that
can't be loaded directly in memory but can be delivered in chunk to be written or read.

### Types of streams

Node.js has four types of stream:

- <b>Writable</b>: are those which data can be written.
- <b>Readable</b>: are those which data can be read.
- <b>Duplex</b>: stream that works in both modes, write and read
- <b>Transform</b>: are those Duplex stream that modify the data.

### Let's get to work!

In example, I will use streams writable and readable; the first one to generate a long json file with an array of
million of users, the second one to read that list by chunks and print one by one every user full object is completed
loaded.

### Build large user list

To write the file I will use the function `createWriteStream` from `fs`, it's receive the path and name of the file
that we want to write in the disk, if it doesn't exist it's created, then the object `file` has the function `write`
that we will use to write in the file.

```javascript
// src/write.ts
import fs from 'fs';

const file = fs.createWriteStream('./src/large-user-list.json');

const SIZE = 1e6;
const user = {...};

function writeLargeUserList() {
    let newIdCounter = 1;

    file.write('[');
    for (let i = 0; i < SIZE; i++) {
        file.write(`${JSON.stringify(user)},`);
    }
    file.write(']');

    console.log(`✅ Finished! The large user list is saved to **large-user-list.json**`);
}
```

### Read file by chunks

In this section I will cover 2 main things

1) Read the file using streams.
2) Print each full user data once the chunks that contain it are loaded

To read the file we will use `createReadStream` function, it's receive the path and name of the file that we want to
read in the disk - similar to `createWriteStream`.

```javascript
// src/read.ts
import fs from 'fs';

const readable = fs.createReadStream('./src/large-user-list.json');
```

To handle the stream that we are reading we have two options, `pipe` function that has writable stream as input that we
will use as destination, the `pipe` function is more simple since handle error or end-of-file, it can be chained in case
our use case need more than one writable stream, for example:

```javascript
readable
    .pipe(writable1)
    .pipe(writable2)
```

The second option to handle our readable stream is the event way, this approach allows to add custom control over the
stream, for this exercise we will use this method.

For our purpose we will import `Writable` class from `stream`, we will create a new instance of it where we will
configure the `write` method to handle our implementation to manipulate the list.

```javascript
import {Writable} from 'stream';

const outStream = new Writable({
    write(chunk, encoding, callback) {
        const data = chunk.toString();
        console.log('Chunk: ', data);
        callback();
    },
});
```

`write` method has as input `chuck` which is our fragment of data, the `callback` is necessary to get the next chunk if
is available.

Next step is pass `outStream` to `readable` on the events that we want to listen

```javascript
readable.on('data', (chunk) => {
    outStream.write(chunk);
});

readable.on('end', () => {
    outStream.end();
});
```

At this point we have the ability to read our user list, if execute the file in the terminal is possible to see things
like this, where the key `name` is the end of a chunk and `Leanne Graham` is the value of the `name` in the beginning of
the next one.

### How to know when a user object is complete loaded?

Since we are working with a list of json objects we have some characters that we can use as tokens to know when the list
start and end - `[`, `]`, the `,` helps to know when object is finished and `{`, `}` works a token to determinate when a
object is completed.

The variable `brackets` works as counter, when the value is `0` means that object is completed (like `{...{...}}`), but
if the value is different to it means that object is not completed, for example if value is `2`, the current state of
the object would be like `{...{...`.

The `buffer` array store the current character and join it to build the object once it is completed, it is reset it to
store the next round of characters.

This approach is inspired in the Polish notation, follow the same logic to know when a token (`brackets` counter)
trigger an operation (print an object), to handle the right order use an array to store the operands (characters).

```javascript
let brackets = 0;
let buffer: string[] = [];

function prefixNotation(input: string) {
    let inputArr = input.split('');
    let current: string | undefined;

    while (inputArr.length) {
        // get first character of the given chunk
        current = inputArr.shift();

        if (['[', ']'].includes(current)) continue;

        buffer.push(current);

        // control the brackets to know if object is completed loaded
        if (current === '{') brackets += 1;
        if (current === '}') brackets -= 1;

        // scenario when there is not object loaded but is a , 
        if (brackets === 0 && buffer.length === 1) {
            buffer = [];
            continue;
        }

        // full object is loaded in the buffer and is ready to be printed
        if (brackets === 0) {
            const user = buffer.join('');
            buffer = [];
            console.log(JSON.parse(user));
        }
    }
}

const outStream = new Writable({
    write(chunk, encoding, callback) {
        const data = chunk.toString();
        prefixNotation(data);
        callback();
    },
});
```

### Conclusions

- Node streams are powerful option to handle big amount of data from different source, for example files; or use them to
  handle http request, it allows to keep open a channel to write or read data from the server, and using a reasonable
  use of memory to solve more complex issues.
- Applying mathematical concepts we could build elegant solutions to solve complex situations

### Sources

- [Github](https://github.com/cristian-ramirez/node-streaming/tree/main/src)
- [Node.js](https://nodejs.org/docs/latest/api/stream.html)
- [freeCodeCamp](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)
- [Polish notation](https://en.wikipedia.org/wiki/Polish_notation)