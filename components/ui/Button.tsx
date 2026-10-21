import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-nuit text-white shadow-[0_10px_24px_-12px_rgb(23_23_23/0.6),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-acier",
  ghost: "bg-white text-nuit ring-1 ring-nuit/10 shadow-soft hover:ring-nuit/25",
  // Bouton principal posé sur une surface sombre
  light: "bg-white text-nuit shadow-soft hover:bg-white/90",
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
