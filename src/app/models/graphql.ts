import gql from "graphql-tag"

export const SEND_MESSAGE_MUTATION = gql`
mutation SendMail
(
    $name: String!,
  	$phone: String!,
  	$email: String!,
  	$message: String!
)
{
    sendMail(sendMailInput: {
    name: $name,
      phone: $phone,
      email: $email,
      message: $message
    })
}`;

export interface SendMessageResponse {
    data: {
        sendMessage: string
    }
}

export interface User {
    id: string,
    email: string,
    name: string,
    role: number,
}

export const LOGIN_MUTATION = gql`
    mutation LoginMutation ($email: String!, $password: String!) {
        login(loginInput: {email: $email, password: $password}) {
        token,
        refreshToken,
        expiresTime
    }
    }
`;

export interface LoginResponse {
    login: {
        token: string,
        refreshToken: string,
        expiresTime: number
    }
}

export const REGISTER_MUTATION = gql`
mutation RegisterMutation ($name: String!, $email: String!, $password: String!) {
    register(registerInput: {name: $name, email: $email, password: $password}) {
    id
}
}
`;

export interface RegisterResponse {
    register: {
        id: string
    }
}

export const ME_QUERY = gql`
query ME_QUERY {
  me {
    id,
    email,
    name,
    isAdmin,
  }
}
`;

export interface MeQueryResponse {
    me: User
}

export const REFRESH_TOKEN_MUTATION = gql`
mutation RefreshTokenMutation {
    refreshToken {
      token,
      expiresTime
    }
  }
`;

export interface RefreshTokenResponse {
    refreshToken: {
        token: string,
        expiresTime: number
    }
}

export interface Tokens {
    token: string;
    refreshToken: string;
    expiresTime: number;
}