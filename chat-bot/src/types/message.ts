export interface Message {
  id: number | string;
  type: string;
  text: string;
  sender: string;
}