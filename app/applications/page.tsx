"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** 
 * Public /applications is deprecated. 
 * Applications management moved inside /admin/applications.
 */
export default function ApplicationsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
