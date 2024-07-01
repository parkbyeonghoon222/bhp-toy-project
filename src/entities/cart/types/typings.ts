export interface Cart {
  id: number;
  session_id?: string;
  cloth_id: number;
  created_at: Date;
}

export type CreateCartParams = Pick<Cart, "session_id" | "cloth_id">;
