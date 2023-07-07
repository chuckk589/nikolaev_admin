export interface RequestWithUser extends Request {
  user: AuthUser;
}
export type AuthUser = { sub: number; role: string; name: string; surname: string };

export type LaunchesStats = {
  thisWeek: number;
  thisMonth: number;
  allTime: number;
};
