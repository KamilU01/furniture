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
    orders: Array<Order>
}

export interface Order {
    id: string,
    pickupInPerson: number,
    orderStart: Date,
    orderEnd: Date,
    totalPrice: number,
    orderProducts: Array<Product>,
    status: number,
    name: string,
    town: string,
    street: string,
    postCode: string,
    email: string
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
    role,
    orders {
        id,
        orderStart,
        orderEnd,
        totalPrice,
        status,
        name
    }
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

export const GET_FAQS_QUERY = gql`
query GET_FAQS_QUERY {
    faqs {
      id,
      question,
      answer
    }
  }
`;

export interface faq {
    id?: string,
    question: string,
    answer: string,
}

export interface getFaqsQuery {
    faqs: Array<faq>
}

export const GET_CATEGORIES_QUERY = gql`
query {
    categories {
    id, 
    name
    }
}
`;

export interface Category {
    id?: string,
    name: string,
    products: Array<Product>
}

export interface GetCategories {
    categories: Array<Category>
}

export const CREATE_PASSWORD_RESET_MUTATION = gql`
mutation CreatePasswordResetMutation
(
$createPasswordResetInput: CreatePasswordResetInput!
)
{
resetPassword
(createPasswordResetInput: $createPasswordResetInput)
{
    id,
}
}
`;

export interface CreatePasswordResetResponse {
    passwordReset: {
        id: string,
    }
}

export const GET_PASSWORD_RESET_MUTATION = gql`
mutation GetPasswordResetMutation
(
$getPasswordResetInput: GetPasswordResetInput!
)
{
getResetPassword
(getPasswordResetInput: $getPasswordResetInput)
{
    id,
}
}
`;


export interface Arrangament {
    id?: string,
    name: string,
    photo?: string,
    description?: string,
}

export interface GetArrangaments {
    arrangaments: Array<Arrangament>
}

export interface MutationArrangamentResponse {
    arrangament: {
        id: string
    }
}

export interface Room {
    id: string,
    name: string,
    icon: string,
    products: Array<Product>
}

export interface GetRooms {
    rooms: Array<Room>
}

export interface MutationRoomResponse {
    room: {
        id: string
    }
}

export interface Product {
    id?: string,
    name: string,
    price: number,
    description: string,
    amount: number,
    photo: string,
    room: Room | null,
    category: Category | null,
    similarProducts: Array<Product>
}

export interface GetProducts {
    products: Array<Product>
}

export interface MutationProductResponse {
    product: {
        id: string
    }
}

export const GET_NEWEST_PRODUCTS_QUERY = gql`
query {
    products {
    id, 
    name,
    price,
    photo,
    }
}
`;

export const GET_ROOMS_QUERY = gql`
query {
    rooms {
    id, 
    name,
    icon
    }
}
`;

export interface cartItem {
    product: Product,
    quantity: number,
    value?: number
}

export const GET_PRODUCT_QUERY = gql`
query 
(
  $id: String!
)
{
    product(id: $id) {
    id, 
    name,
    price,
    description,
    amount,
    photo,
    room {
        id,
        name,
    },
    category {
        id,
        name
    },
    similarProducts {
        id,
        name,
        price,
        photo
    }
    }
}
`;

export interface getProductResponse {
    product: Product
}

export const GET_CATEGORY_PRODUCTS_QUERY = gql`
query 
(
  $id: String!
)
{
    category(id: $id) {
    id, 
    name,
    products {
      id
      name,
    price,
    description,
    amount,
    photo,
    }
    }
}
`;

export interface getCategoryProductsResponse {
    category: {
        id: string,
        name: string,
        products: Array<Product>
    }
}

export const GET_ROOM_PRODUCTS_QUERY = gql`
query 
(
  $id: String!
)
{
    room(id: $id) {
    id, 
    name,
    icon,
    products {
      id
      name,
    price,
    description,
    amount,
    photo,
    }
    }
}
`;

export interface getRoomProductsResponse {
    room: {
        id: string,
        name: string,
        icon: string,
        products: Array<Product>
    }
}

export const GET_ARRANGMENTS_QUERY = gql`
query {
    arrangments {
    id, 
    name,
    photo
    }
}
`;

export const GET_ARRANGMENT_PRODUCTS_QUERY = gql`
query 
(
  $id: String!
)
{
    arrangment(id: $id) {
    id, 
    name,
    photo,
    description,
    products {
      id
      name,
    price,
    description,
    amount,
    photo,
    }
    }
}
`;

export interface Arrangment {
    id: string,
    photo: string,
    name: string,
    description: string,
    products: Array<Product>
}

export interface getArrangments {
    arrangments: Array<Arrangment>
}

export interface getArrangmentProductsResponse {
    arrangment: Arrangment
}

export const GET_SEARCH_RESULT = gql`
query 
(
  $phrase: String!
)
{
    findProducts(phrase: $phrase) {
      id
      name,
    price,
    description,
    amount,
    photo,
    }
}
`;

export interface getSearchResult {
    findProducts: Array<Product>
}

export const CREATE__ORDER__MUTATION = gql`
mutation CreateOrderMutation 
(
    $createOrderInput: CreateOrderInput!
)
{
    createOrder(createOrderInput: $createOrderInput)
}
`;

export interface CreateOrderResponse {
    createOrder: string
}


export const GET_ORDER_BY_ID = gql`
query 
(
  $id: String!
)
{
    order(id: $id) {
    id, 
    name,
    pickupInPerson,
    orderStart,
    orderEnd,
    totalPrice,
    status,
    name,
    town,
    street,
    postCode,
    email
    orderProducts {
      id,
      totalPrice,
      amount,
      product {
        id,
        name,
        photo,
      }
    }
    }
}
`;

export interface getOrderById {
    order: {
        id: string,
        name: string,
        pickupInPerson: number,
        orderStart: Date,
        orderEnd: Date,
        totalPrice: number,
        status: string,
        town: string,
        street: string,
        postCode: string,
        email: string,
        orderProducts: {
            id: string,
            totalPrice: number,
            amount: number,
            product: Product
        }
    }
}