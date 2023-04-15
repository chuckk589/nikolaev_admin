export interface RequestWithUser extends Request {
  user: AuthUser;
}
export type AuthUser = { sub: number; role: string };
