import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    firstname: String
    lastname: String
    username: String
    email: String
    token: String
    password: String
    moviesSaved: [UserMovieConnection]
    moviesWatched: [UserMovieConnection]
    moviesDisliked: [UserMovieConnection]
  }

  type UserMovieConnection {
    id: ID
    user: [User]
    movies: [Movie]
    title: String
    image: String
    disliked: Boolean
    watched: Boolean
    saved: Boolean
  }

  type Movie {
    id: ID!
    categoryId: ID
    title: String
    original_language: String
    release_date: String
    runtime: Int
    vote_average: Float
    overview: String
    image: String
    genres: [Genre]
    user: [User]
  }
  type Genre {
    id: ID!
    name: String
    movies: [Movie]
  }

  # Top level
  type Query {
    allMovies(take: Int, skip: Int, myCursor: Int): [Movie]
    watchedMovies: [UserMovieConnection]
    savedMovies: [UserMovieConnection]
    dislikedMovies: [UserMovieConnection]
    userMovieRecommendations(take: Int, skip: Int, myCursor: Int): [Movie]
    lastMovie: Movie
    user(userId: ID!): User
    movie(movieId: ID!): Movie
    userMovieConnection(movieId: ID!): Movie
  }
  type Mutation {
    signupUser(signupInput: SignupInput): User!
    signinUser(email: String!, password: String!): User!
    updateUser(firstname: String, lastname: String, username: String,  email: String): User!
    addMovieToUser(
      movieId: ID
      disliked: Boolean
      saved: Boolean
      watched: Boolean
    ): User!
    checkCurrentUser: User!
    removeMovieToUser(movieId: ID): User!
  }
  input SignupInput {
    email: String!
    username: String!
    # firstname: String!
    # lastname: String
    password: String!
  }
`;

export default typeDefs;
