// Amazon S3 stuff
import AWS from 'aws-sdk';
import {AWS_CONFIG, S3_REGION} from '../../config';

AWS.config.update({
  ...AWS_CONFIG,
  region: S3_REGION,
});

// Initialize AWS S3
const S3 = new AWS.S3();

export default S3;
