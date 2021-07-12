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