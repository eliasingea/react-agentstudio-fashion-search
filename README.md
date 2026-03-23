# react-instantsearch-app

_This project was generated with [create-instantsearch-app](https://github.com/algolia/instantsearch/tree/master/packages/create-instantsearch-app) by [Algolia](https://algolia.com)._

## Get started

To run this project locally, first install the dependencies, then run the development server:

```sh
npm install
npm run dev
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn dev
```

The development server will start and you can access the application at the URL shown in the terminal (typically `http://localhost:5173`).

## Build

To build the project for production:

```sh
npm run build
```

Or with Yarn:

```sh
yarn build
```

This will compile TypeScript, bundle the application, and output the production-ready files to the `dist` directory.

To preview the production build locally:

```sh
npm run preview
```

Or with Yarn:

```sh
yarn preview
```

## Environment Variables

This project requires several environment variables to function properly. These variables are used to configure the Algolia search client, index names, and AI agent integration.

Create a `.env` file in the root directory with the following variables:

### Required Variables

- **`VITE_ALGOLIA_APP_ID`** (required)
  - Your Algolia Application ID
  - Used to initialize the Algolia search client and make API requests
  - Example: `ABC123XYZ9`

- **`VITE_ALGOLIA_API_KEY`** (required)
  - Your Algolia API Key (search-only key recommended for client-side usage)
  - Used to authenticate requests to the Algolia API
  - Example: `a1b2c3d4e5f6789012345678901234ab`

- **`VITE_ALGOLIA_INDEX_NAME`** (required)
  - The name of your primary Algolia search index
  - Used for product search functionality throughout the application
  - Example: `products_index`

- **`VITE_ALGOLIA_INDEX_NAME_SUGGESTIONS`** (required)
  - The name of your Algolia query suggestions index
  - Used for autocomplete and search suggestions in the header
  - Example: `products_query_suggestions`

- **`VITE_ALGOLIA_AGENT_ID`** (required)
  - Your Algolia Agent Studio agent ID
  - Used by the Chat component to power the AI chat interface
  - Example: `12345678-90ab-cdef-1234-567890abcdef`

### Setup

1. Copy the example environment file (if available) or create a new `.env` file in the root directory
2. Add all required environment variables with your actual values
3. Restart the development server for changes to take effect

**Note:** All environment variables are prefixed with `VITE_` because this project uses Vite, which only exposes variables with this prefix to client-side code. This is a security feature to prevent accidentally exposing sensitive server-side variables.
