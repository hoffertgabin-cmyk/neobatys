import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // Texte bleu nuit sur orange : contraste AA (le blanc sur #F97316 ne passe pas)
  primary:
    "bg-gradient-chantier text-nuit shadow-glow hover:shadow-[0_12px_40px_-8px_rgb(249_115_22/0.7)]",
  secondary: "bg-nuit text-white shadow-soft hover:bg-acier",
  ghost: "bg-white text-nuit ring-1 ring-nuit/10 shadow-soft hover:ring-nuit/25",
  "outline-light": "bg-white/5 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    React.ComponentProps<"button">,
    "className"
  >;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Partial<CommonProps>) {
  return cn(
    "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition-[transform,translate,scale,box-shadow,background-color] duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chantier disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

function Inner({ icon, arrow, children }: Pick<CommonProps, "icon" | "arrow" | "children">) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, size, arrow, icon, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, className });

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    const external = /^(tel:|mailto:|https?:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...(linkProps as React.ComponentProps<"a">)}>
          <Inner icon={icon} arrow={arrow}>
            {children}
          </Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkProps}>
        <Inner icon={icon} arrow={arrow}>
          {children}
        </Inner>
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ComponentProps<"button">)}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
