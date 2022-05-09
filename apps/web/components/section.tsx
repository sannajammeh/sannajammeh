import { forwardRef, HTMLProps, useId, useMemo } from "react";
import clsx from "clsx";
import { pickChildByProps, pickChildByType } from "../utils/children";

const SectionAside = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    const [title, description, number] = useMemo(
      () => [
        pickChildByProps(children, SectionTitle.defaultProps),
        pickChildByProps(children, SectionDescription.defaultProps),
        pickChildByProps(children, SectionNumber.defaultProps),
      ],
      [children]
    );

    return (
      <aside className={clsx("relative h-min", className)} {...props} ref={ref}>
        <div className="whitespace-nowrap">{number}</div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2">
          {title}
          {description && <small>{description}</small>}
        </div>
      </aside>
    );
  }
);

SectionAside.displayName = "SectionAside";

const SectionTitle = ({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <h1
      className={clsx(
        "text-4xl font-bold italic leading-none uppercase",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

SectionTitle.defaultProps = {
  ["data-aside-item"]: "title",
};

const SectionDescription = ({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <p className={clsx(className)} {...props}>
      {children}
    </p>
  );
};

SectionDescription.defaultProps = {
  ["data-aside-item"]: "description",
};

const SectionNumber = ({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <span
      className={clsx(
        "text-[16rem] md:text-[calc(18rem)] text-bordered font-bold leading-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

SectionNumber.defaultProps = {
  ["data-aside-item"]: "number",
};

const SectionContent = ({
  children,
  className,
  fullWidth = false,
  ...props
}: HTMLProps<HTMLDivElement> & { fullWidth?: boolean }) => {
  const id = useId();
  return (
    <div
      id={`${id}-content`}
      className={clsx(className, {
        "col-span-2": fullWidth,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

const SectionRoot = ({
  className,
  children,
  fullWidth,
  ...props
}: HTMLProps<HTMLDivElement> & { fullWidth?: boolean }) => {
  return (
    <section
      className={clsx(
        "mx-auto xl:grid grid-cols-[3fr,_7fr] gap-4",
        !fullWidth && "container",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export const Root = SectionRoot;
export const Aside = SectionAside;
export const Number = SectionNumber;
export const Title = SectionTitle;
export const Description = SectionDescription;
export const Content = SectionContent;
