
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrustedPoster, setIsTrustedPoster] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsTrustedPoster(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("is_admin, is_trusted_poster")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setIsAdmin(data.is_admin);
          setIsTrustedPoster(data.is_trusted_poster);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  return { isAdmin, isTrustedPoster, isLoading };
};
