import {gql} from 'apollo-boost';

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!, $folderKey: s3FolderKey!, $id: ID!) {
    uploadFile(file: $file, folderKey: $folderKey, id: $id)
  }
`;

const REGISTER_RESOURCE = gql`
  mutation resource($resource: ResourceInput!) {
    resource(resource: $resource) {
      name
      link
      date
    }
  }
`;

export {UPLOAD_FILE, REGISTER_RESOURCE};
