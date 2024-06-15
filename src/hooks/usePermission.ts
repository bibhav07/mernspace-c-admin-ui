import { User } from "../store";

export const usePermission = () => {
  const allowedRoles = ["admin", "manager"];

  const _hasPermission = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
