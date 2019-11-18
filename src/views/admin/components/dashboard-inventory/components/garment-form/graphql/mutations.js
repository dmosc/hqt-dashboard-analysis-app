import {gql} from 'apollo-boost';

const GARMENT_REGISTER = gql`
  mutation garment($garment: GarmentInput!) {
    garment(garment: $garment) {
      code
    }
  }
`;

export {GARMENT_REGISTER};
