import logoAsset from "@/assets/techrise-logo.png.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="TechRise Africa"
      className={className}
      style={{ filter: "drop-shadow(0 0 18px oklch(0.65 0.25 295 / 0.55))" }}
    />
  );
}