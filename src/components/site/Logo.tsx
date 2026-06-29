import logoAsset from "@/assets/techrise-logo.png.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-xl bg-white px-2 py-1 ring-1 ring-white/20 shadow-[0_0_22px_-4px_oklch(0.65_0.25_295/0.7)]">
      <img
        src={logoAsset.url}
        alt="TechRise Africa"
        className={className}
      />
    </span>
  );
}