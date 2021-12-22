import AWS from './aws-sdk';

const date = new Date().toISOString();
const SQS = new AWS.SQS({ apiVersion: date });

export default SQS;
