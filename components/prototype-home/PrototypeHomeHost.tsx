// PROTOTYPE — throwaway host. Mounts VariantA/B/C on the existing `/` route via
// `?variant=`. Production is untouched: no param defaults to A in dev only;
// `?variant=prod` shows production; production builds always show production.
"use client";

import { useSearchParams } from "next/navigation";
import { PrototypeSwitcher } from "./PrototypeSwitcher";
import { VariantA } from "./VariantA";
import { VariantB } from "./VariantB";
import { VariantC } from "./VariantC";

export function PrototypeHomeHost({ children }: { children: React.ReactNode }) {
  // Belt-and-braces: a stray prototype merge must never ship variants to users.
  if (process.env.NODE_ENV === "production") return <>{children}</>;

  return <PrototypeHomeHostInner>{children}</PrototypeHomeHostInner>;
}

function PrototypeHomeHostInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant") ?? "A";

  return (
    <>
      {variant === "prod" ? (
        <>{children}</>
      ) : variant === "B" ? (
        <VariantB />
      ) : variant === "C" ? (
        <VariantC />
      ) : (
        <VariantA />
      )}
      <PrototypeSwitcher current={variant} />
    </>
  );
}
