const mqtt = require('mqtt');
const fs = require('fs');

const base_topic = 'test-topic';

function connectTCP() {
  const protocol = 'mqtt';
  const host = 'localhost';
  const port = '1883';
  const connectUrl = `${protocol}://${host}:${port}`;
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const topic = base_topic + '/tcp';

  console.log('TCP connect client id :', clientId);
  const client = mqtt.connect(connectUrl, {
    clientId,
    connectTimeout: 4000
  });

  client.on('connect', () => {
    client.subscribe(topic, (error) => {
      if (!error) {
        client.publish(topic, 'TPC')
      }
    });
  });


  client.on('message', (topic, message) => {
    console.log('subscribe to', message.toString());
    client.end();
  });
}

function connectWebsocket() {
  const protocol = 'ws';
  const host = 'localhost';
  const port = '8083';
  const path = '';
  const connectUrl = `${protocol}://${host}:${port}${path}`;
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const topic = base_topic + '/websocket';

  console.log('WebSocket connect client id :', clientId);
  const client = mqtt.connect(connectUrl, {
    clientId,
    connectTimeout: 4000,
  });

  client.on('connect', () => {
    client.subscribe(topic, (error) => {
      if (!error) {
        client.publish(topic, 'WebSocket')
      }
    });
  });


  client.on('message', (topic, message) => {
    console.log('subscribe to', message.toString());
    client.end();
  });
}

function connectTLS() {
  const protocol = 'mqtts';
  const host = 'localhost';
  const port = '8883';
  const connectUrl = `${protocol}://${host}:${port}`;
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const topic = base_topic + '/tls-ssl';

  console.log('TLS/SSL connect client id :', clientId);
  const client = mqtt.connect(connectUrl, {
    clientId,
    connectTimeout: 4000,
    // サーバーがCA証書を使用している場合は、CAを渡す
    ca: fs.readFileSync('./ssl/ca.crt'),
  });

  client.on('connect', () => {
    client.subscribe(topic, (error) => {
      if (!error) {
        client.publish(topic, 'TLS/SSL')
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log('subscribe to', message.toString());
    client.end();
  });
}

function connectSecureWebsocket() {
  const protocol = 'wss';
  const host = 'localhost';
  const port = '8084';
  const path = '';
  const connectUrl = `${protocol}://${host}:${port}${path}`;
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  const topic = base_topic + '/secure-websocket';

  console.log('Secure WebSocket connect client id :', clientId);
  const client = mqtt.connect(connectUrl, {
    clientId,
    connectTimeout: 4000,
    // サーバーがCA証書を使用している場合は、CAを渡す
    ca: fs.readFileSync('./ssl/ca.crt'),
  });

  client.on('connect', () => {
    client.subscribe(topic, (error) => {
      if (!error) {
        client.publish(topic, 'Secure WebSocket')
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log('subscribe to', message.toString());
    client.end();
  });
}

connectTCP();
connectWebsocket();
connectTLS();
connectSecureWebsocket();
