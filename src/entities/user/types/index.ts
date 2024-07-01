export type User = {
  email: string;
  password: string;
};

export type Session = {
  sessionId: string;
  userId?: number;
};
