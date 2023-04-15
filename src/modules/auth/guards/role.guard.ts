import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { RequestWithUser } from 'src/types/interfaces';

export const RoleGuard = (role: string | string[]) => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest() as RequestWithUser;
      const user = request.user;
      return user && (Array.isArray(role) ? role.includes(user.role) : user.role === role);
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
