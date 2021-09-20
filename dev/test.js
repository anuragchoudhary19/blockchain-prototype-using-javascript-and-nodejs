const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
console.log(bitcoin);
const previousBlockHash = 'GKGKGHKJHHLEJEJFEJF3FF';
const currentBlockData = [
  { amount: 103, sender: 'HJGGHHGKHJHKL', recipient: 'KHKGHGGKHJKLN' },
  { amount: 105, sender: 'yjryjrjr', recipient: 'trjrjrjr' },
  { amount: 1067, sender: 'fbdsdgggh', recipient: 'ththerthr' },
];
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
