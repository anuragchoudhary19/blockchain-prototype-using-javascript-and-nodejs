const sha256 = require('sha256');
const { v1: uuidv1 } = require('uuid');
const currentNodeUrl = process.argv[3];

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];
  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];

  this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transaction: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };
  this.pendingTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
  const newTransaction = {
    transactionId: uuidv1().split('-').join(''),
    amount: amount,
    sender: sender,
    recipient: recipient,
  };
  return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
  this.pendingTransactions.push(transactionObj);
  return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockHash, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockHash);
  const hash = sha256(dataAsString);
  return hash;
};

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log(hash);
  }
  return nonce;
};

Blockchain.prototype.chainIsValid = function (blockchain) {
  let validChain = true;
  for (let i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const prevBlock = blockchain[i - 1];
    const blockHash = this.hashBlock(
      prevBlock['hash'],
      {
        transactions: currentBlock['transaction'],
        index: currentBlock['index'],
      },
      currentBlock['nonce']
    );
    if (blockHash !== currentBlock['hash']) {
      validChain = false;
    }
    if (currentBlock['previousBlockHash'] !== prevBlock['hash']) {
      validChain = false;
    }
  }
  const genesisBlock = blockchain[0];
  const correctNonce = genesisBlock['nonce'] === 100;
  const correctPreviousHash = genesisBlock['previousBlockHash'] === '0';
  const correctHash = genesisBlock['hash'] === '0';
  const correctTransactions = genesisBlock['transaction'].length === 0;
  if (!correctNonce || !correctPreviousHash || !correctHash || !correctTransactions) {
    validChain = false;
  }
  return validChain;
};

Blockchain.prototype.getBlock = function (blockHash) {
  let correctBlock = null;
  this.chain.forEach((block) => {
    if (block.hash === blockHash) {
      correctBlock = block;
    }
  });
  return correctBlock;
};
Blockchain.prototype.getTransaction = function (transactionId) {
  let correctTransactions = null;
  let correctBlock = null;
  this.chain.forEach((block) => {
    block.transaction.forEach((transaction) => {
      if (transaction.transactionId === transactionId) {
        correctTransactions = transaction;
        correctBlock = block;
      }
    });
  });
  return { transaction: correctTransactions, block: correctBlock };
};
Blockchain.prototype.getAddress = function (address) {
  let addressTransactions = [];
  this.chain.forEach((block) => {
    block.transaction.forEach((transaction) => {
      if (transaction.sender === address || transaction.recipient === address) {
        addressTransactions.push(transaction);
      }
    });
  });
  let balance = 0;
  addressTransactions.forEach((transaction) => {
    if (transaction.sender === address) {
      balance -= transaction;
    } else if (transaction.recipient === address) {
      balance += transaction;
    }
  });
  return { addressTransactions: addressTransactions, addressBalance: balance };
};

module.exports = Blockchain;
