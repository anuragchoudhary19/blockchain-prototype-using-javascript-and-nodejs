const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const bc1 = {
  chain: [
    {
      index: 1,
      timestamp: 1632216452882,
      transaction: [],
      nonce: 100,
      hash: '0',
      previousBlockHash: '0',
    },
    {
      index: 2,
      timestamp: 1632216469643,
      transaction: [],
      nonce: 18140,
      hash: '0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100',
      previousBlockHash: '0',
    },
    {
      index: 3,
      timestamp: 1632216484413,
      transaction: [
        {
          transactionId: '303ac8b01abe11ec8cb7f59188ad5b08',
          amount: 6.25,
          sender: '00',
          recipient: '25d642f01abe11ec8cb7f59188ad5b08',
        },
        {
          transactionId: '3650b4d01abe11ec8cb7f59188ad5b08',
          amount: 4000,
          sender: 'HVJCVGHCKGHVJVHJ',
          recipient: 'JKBKHJHGVHKJNLKJM',
        },
      ],
      nonce: 31062,
      hash: '000018234d981701e2b71d8970e1e4a6224d218f1c0b4318b3815fb2793ed0b7',
      previousBlockHash: '0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100',
    },
    {
      index: 4,
      timestamp: 1632216514396,
      transaction: [
        {
          transactionId: '3901cb101abe11ec8cb7f59188ad5b08',
          amount: 6.25,
          sender: '00',
          recipient: '25d642f01abe11ec8cb7f59188ad5b08',
        },
        {
          transactionId: '3fbe09501abe11ec8cb7f59188ad5b08',
          amount: 2000,
          sender: 'HVJCVGHCKGHVJVHJ',
          recipient: 'JKBKHJHGVHKJNLKJM',
        },
        {
          transactionId: '42797fd01abe11ec8cb7f59188ad5b08',
          amount: 6000,
          sender: 'HVJCVGHCKGHVJVHJ',
          recipient: 'JKBKHJHGVHKJNLKJM',
        },
      ],
      nonce: 55147,
      hash: '0000f5fc1f86ddabcb02de2b068bbbddc91fc9d2ee70ae89b36a96feb0c673b9',
      previousBlockHash: '000018234d981701e2b71d8970e1e4a6224d218f1c0b4318b3815fb2793ed0b7',
    },
  ],
  pendingTransactions: [
    {
      transactionId: '4ae0aef01abe11ec8cb7f59188ad5b08',
      amount: 6.25,
      sender: '00',
      recipient: '25d642f01abe11ec8cb7f59188ad5b08',
    },
  ],
  currentNodeUrl: 'http://localhost:3001',
  networkNodes: [],
};
console.log('Valid', bitcoin.chainIsValid(bc1.chain));
// const nonce = 199;
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

// bitcoin.createNewBlock(5252, 'FGHETHEHERHE', 'GREWGERGEGEG');
// bitcoin.createNewTransaction(100, 'ANURAGJHFJFJHGHGJ', 'SUNNYJHJGVJJHBBJHBH');
// bitcoin.createNewBlock(32525, 'SVSFSBSFBSB', 'VSBSFBFBFDBDB');
// bitcoin.createNewTransaction(436463, 'ANURAGJHFJFJHGHGJ', 'SUNNYJHJGVJJHBBJHBH');
// bitcoin.createNewTransaction(6346363, 'ANURAGJHFJFJHGHGJ', 'SUNNYJHJGVJJHBBJHBH');
// bitcoin.createNewTransaction(6363363, 'ANURAGJHFJFJHGHGJ', 'SUNNYJHJGVJJHBBJHBH');
// bitcoin.createNewBlock(44235645, 'SDSFSHHSR', 'HHEHEHHETET');
// console.log(bitcoin.chain[2]);

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 122247));
