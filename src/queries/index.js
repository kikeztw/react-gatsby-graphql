import gql from 'graphql-tag';

export const GET_TODOS = gql`
  query todo {
    todoes(orderBy: createdAt_DESC){
      name
      description
      id
      userses{
        picture{
          url
        }
        name
        id
      }
    }
  }`;

export const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $description: String!, $users: [UsersWhereUniqueInput!]){
    createTodo( data: {
      name: $name
      description: $description
      userses:{
        connect: $users
      }
    }){
      name
      id
      description
      userses{
        picture{
          url
        }
        name
        id
      }
    }
  }`;

export const GET_TEAM = gql`
  query {
    userses{
      id
      name
      username
      picture {
        id
        url
      }
    }
  }`;


export const CURRENT_USER = gql`
  query{
    todo {
      users(where: {id: "ck7r2imrpv83t0998qox0sqks"}) {
        name
        username
        picture {
          url
        }
      }
    }
  }`;
