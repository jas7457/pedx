/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: COLLECTION_GRID_QUERY2
// ====================================================

export interface COLLECTION_GRID_QUERY2_collections_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface COLLECTION_GRID_QUERY2_collections_edges_node {
  __typename: "Collection";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * A human-friendly unique string for the collection automatically generated from its title.
   * Limit of 255 characters.
   */
  handle: string;
  /**
   * Stripped description of the collection, single line with HTML tags removed.
   */
  description: string;
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * Image associated with the collection.
   */
  image: COLLECTION_GRID_QUERY2_collections_edges_node_image | null;
}

export interface COLLECTION_GRID_QUERY2_collections_edges {
  __typename: "CollectionEdge";
  /**
   * The item at the end of CollectionEdge.
   */
  node: COLLECTION_GRID_QUERY2_collections_edges_node;
}

export interface COLLECTION_GRID_QUERY2_collections {
  __typename: "CollectionConnection";
  /**
   * A list of edges.
   */
  edges: COLLECTION_GRID_QUERY2_collections_edges[];
}

export interface COLLECTION_GRID_QUERY2 {
  /**
   * List of the shop’s collections.
   */
  collections: COLLECTION_GRID_QUERY2_collections;
}
