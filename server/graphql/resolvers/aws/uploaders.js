import path from 'path';
import S3 from '../../../clients/aws/s3';
import {S3_BUCKET} from '../../../config';

export const S3Upload = params =>
  new Promise((resolve, reject) =>
    S3.upload(params, (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    })
  );

const uploaders = {
  uploadFile: async (_, {file: {originFileObj}, folderKey, id}) => {
    try {
      const {createReadStream, filename} = await originFileObj;

      const stream = createReadStream();
      const indexOfExtension = filename.lastIndexOf('.');
      const newFilename = Date.now() + filename.substring(indexOfExtension);

      const S3Path = path.join(folderKey, id, newFilename).replace(/\\/g, '/');

      const params = {
        Bucket: S3_BUCKET,
        Body: stream,
        Key: S3Path,
        ACL: 'public-read',
      };

      const {Location} = await S3Upload(params);

      return Location;
    } catch (err) {
      throw new Error(err);
    }
  },
  // In future versions, this image upload should validate image type and encoding, in order
  // to ensure data integrity. Check https://github.com/foliojs/pdfkit/blob/master/lib/image.js
  // as an example of encoding validation by type.
  uploadImage: async (_, {image, folderKey, id}) => {
    try {
      const {createReadStream, filename} = await image;

      const stream = createReadStream();
      const indexOfExtension = filename.lastIndexOf('.');
      const newFilename = Date.now() + filename.substring(indexOfExtension);

      const S3Path = path.join(folderKey, id, newFilename).replace(/\\/g, '/');

      const params = {
        Bucket: S3_BUCKET,
        Body: stream,
        Key: S3Path,
        ACL: 'public-read',
      };

      const {Location} = await S3Upload(params);
      return Location;
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default uploaders;
