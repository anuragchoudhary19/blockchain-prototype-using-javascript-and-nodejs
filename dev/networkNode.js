const express = require('express');
const app = express();
const { v1: uuidv1 } = require('uuid');
const Blockchain = require('./blockchain');
const nodeAddress = uuidv1().split('-').join('');
const port = process.argv[2];
const rp = require('request-promise');

const bitcoin = new Blockchain();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
  const blockIndex = bitcoin.addTransactionToPendingTransactions(req.body.newTransaction);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});
app.post('/transaction/broadcast', function (req, res) {
  const { amount, sender, recipient } = req.body;
  const newTransaction = bitcoin.createNewTransaction(amount, sender, recipient);
  bitcoin.addTransactionToPendingTransactions(newTransaction);
  const requestPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: { newTransaction },
      json: true,
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises).then((data) => {
    res.json({ note: 'Transaction broadcasted successfully.' });
  });
});

app.get('/mine', function (req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1,
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
  bitcoin.createNewTransaction(6.25, '00', nodeAddress);
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  let requestPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true,
    };
    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then((data) => {
      const requestOptions = {
        uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
        method: 'POST',
        body: { amount: 6.25, sender: '00', recipient: nodeAddress },
        json: true,
      };
      return rp(requestOptions);
    })
    .then((data) => {
      res.json({ note: 'New block mined successfuly', block: newBlock });
    });
});

app.post('/receive-new-block', function (req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = bitcoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const corrctIndex = lastBlock['index'] + 1 === newBlock['index'];

  if (correctHash && corrctIndex) {
    bitcoin.chain.push(newBlock);
    bitcoin.pendingTransactions = [];
    res.json({ note: 'New block received and accepted', newBlock: newBlock });
  } else {
    res.json({ note: 'New block was rejected', newBlock: newBlock });
  }
});

app.post('/register-and-broadcast-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
    bitcoin.networkNodes.push(newNodeUrl);
  }
  let regNodesPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };
    regNodesPromises.push(rp(requestOptions));
  });
  Promise.all(regNodesPromises)
    .then((data) => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
        json: true,
      };
      return rp(bulkRegisterOptions);
    })
    .then((data) => {
      res.json({ note: 'New node registered successfully' });
    });
});
app.post('/register-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (bitcoin.currentNodeUrl !== newNodeUrl && bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
    bitcoin.networkNodes.push(newNodeUrl);
  }
  res.json({ note: 'New node registered successfully.' });
});
app.post('/register-nodes-bulk', function (req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach((networkNodeUrl) => {
    if (bitcoin.currentNodeUrl !== networkNodeUrl && bitcoin.networkNodes.indexOf(networkNodeUrl) == -1) {
      bitcoin.networkNodes.push(networkNodeUrl);
    }
  });
  res.json({ note: 'Bulk registration successfully.' });
});

// app.post('/concensus');

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
