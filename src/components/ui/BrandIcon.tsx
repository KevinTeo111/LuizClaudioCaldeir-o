import { resolveIcon } from "@/lib/icons";
import { cn, initials } from "@/lib/utils";

type Props = {
  slug: string;
  label?: string;
  className?: string;
  /** use the brand's own colour instead of the current text colour */
  color?: boolean;
};

/** Brand logo from simple-icons, or a lettered mark when the brand is unavailable. */
export function BrandIcon({ slug, label, className, color = false }: Props) {
  const icon = resolveIcon(slug);
  if (!icon) {
    return (
      <span
        className={cn(
          "inline-grid place-items-center rounded-md bg-white/10 font-mono text-[10px] font-semibold leading-none text-ink-2",
          className,
        )}
        aria-label={label}
      >
        {initials(label ?? slug)}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={label ?? icon.title}
      style={color ? { color: `#${icon.hex}` } : undefined}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
