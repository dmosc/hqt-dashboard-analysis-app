import {gql} from 'apollo-boost';

const ARTISAN_REGISTER = gql`
  mutation artisan($artisan: ArtisanRegister!) {
    artisan(artisan: $artisan) {
      code
    }
  }
`;

export {ARTISAN_REGISTER};
