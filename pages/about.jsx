import { useRouter } from "next/router";
import React from "react";

export default function About() {
  const router = useRouter();
  const { about } = router.query;

  return <div>About</div>;
}
