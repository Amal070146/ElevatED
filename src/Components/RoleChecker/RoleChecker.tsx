import React, { useState, useEffect, ReactNode } from 'react';
import { supabase } from "../../utils/supabase";

interface RoleCheckerProps {
  checkRoleName: string;
  children: ReactNode;
}

const RoleChecker: React.FC<RoleCheckerProps> = ({ checkRoleName, children }) => {
  const [hasRole, setHasRole] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserRole() {
      try {
        const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
        const { data, error } = await supabase.rpc('user_has_role', {
          check_role_name: checkRoleName,
          check_user_id: user.id
        });
        if (error) {
          console.error(error);
        } else {
          setHasRole(data);
        }}
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkUserRole();
  }, [checkRoleName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return hasRole ? <>{children}</> : <></>;
};

export default RoleChecker;
