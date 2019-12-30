import {gql} from 'apollo-boost';

const GET_ARTISANS = gql`
  query artisans($filters: ArtisanFilters!) {
    artisans(filters: $filters) {
      id
      firstName
      lastName
      username
      code
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
  query inventory($filters: InventoryFilters!) {
    inventory(filters: $filters) {
      production {
        id
        productName
        code
        productType
        dateReceived
        retailPrice
        seller {
          firstName
          lastName
        }
        artisan {
          code
        }
      }
      stock {
        id
        productName
        code
        productType
        dateReceived
        retailPrice
        seller {
          firstName
          lastName
        }
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
        code
        productType
        dateReceived
        dateSold
        retailPrice
        seller {
          firstName
          lastName
        }
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
