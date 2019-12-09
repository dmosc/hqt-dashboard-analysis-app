import {gql} from 'apollo-boost';

const GET_ARTISANS = gql`
  query artisans($filters: ArtisanFilters!) {
    artisans(filters: $filters) {
      id
      firstName
      lastName
      origin {
        id
        municipality
        community
        group
        code
      }
    }
  }
`;

const GET_LOCATIONS = gql`
  query locations($filters: LocationFilters!) {
    locations(filters: $filters) {
      id
      name
    }
  }
`;

const GET_PRODUCT_TYPES = gql`
  query productTypes($filters: ProductTypeFilters!) {
    productTypes(filters: $filters) {
      id
      name
      code
    }
  }
`;

const GET_INVENTORY = gql`
  query inventory {
    inventory {
      production {
        id
        productName
        productType
        dateReceived
        retailPrice
        artisan {
          code
        }
      }
      stock {
        id
        productName
        productType
        dateReceived
        retailPrice
        artisan {
          code
        }
        location {
          name
        }
      }
      dispatched {
        id
        productName
        productType
        dateReceived
        dateSold
        retailPrice
        artisan {
          code
        }
        location {
          name
        }
      }
    }
  }
`;

export {GET_ARTISANS, GET_LOCATIONS, GET_PRODUCT_TYPES, GET_INVENTORY};
