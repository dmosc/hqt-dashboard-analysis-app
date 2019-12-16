import {gql} from 'apollo-boost';

const ARTISAN_EDIT = gql`
  mutation artisanEdit($artisan: ArtisanEdit!) {
    artisanEdit(artisan: $artisan) {
      id
      firstName
      lastName
      username
      email
      password
    }
  }
`;

export {ARTISAN_EDIT};
