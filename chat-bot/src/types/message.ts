export interface Message {
  id: number | string;
  type: string;
  text: string;
  sender: string;
  message?:string,
  message_id:string|number
}
