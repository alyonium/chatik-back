export interface Message {
  id?: number;
  userId: string;
  content: string;
}

export interface MessageResponse {
  id: number;
  username: string;
  content: string;
  created_at: Date;
}
