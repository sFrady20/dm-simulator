import dynamic from "next/dynamic";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  lazy,
  ReactNode,
  Suspense,
  useId,
  useMemo,
} from "react";

export const Phone = forwardRef<
  ElementRef<"svg">,
  ComponentPropsWithoutRef<"svg">
>((props, ref) => {
  const { children, style, ...rest } = props;

  return (
    <svg
      ref={ref}
      width="450"
      height="920"
      viewBox="0 0 450 920"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ "--screen-background": "white", ...style } as any}
      {...rest}
    >
      <Suspense fallback={"Loading..."}>{children}</Suspense>
    </svg>
  );
});
Phone.displayName = "Phone";

//

export const PhoneBezel = function (props: {
  variant: "iphone-16-pro-black-titanium";
}) {
  const { variant, ...rest } = props;

  const Bezel = useMemo(
    () => dynamic<typeof rest>(() => import(`./bezels/${variant}.tsx`)),
    [variant]
  );

  return <Bezel {...rest} />;
};

//

export const PhoneContent = function (props: { children?: ReactNode }) {
  const { children, ...rest } = props;

  const id = useId();

  return (
    <>
      <g clip-path={`url(#clip-${id})`}>{children}</g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect x="24" y="23" width="402" height="874" rx="48" fill="white" />
        </clipPath>
      </defs>
    </>
  );
};

//

export const PhoneScreen = function (
  props: Record<string, any> & {
    variant: "imessage";
    children?: ReactNode;
  }
) {
  const { variant, ...rest } = props;

  const Screen = useMemo(
    () => dynamic<typeof rest>(() => import(`./screens/${variant}.tsx`)),
    [variant]
  );

  return <Screen {...rest} />;
};

//

export const PhoneInterface = function (props: { variant: "iphone" }) {
  const { variant, ...rest } = props;

  const Interface = useMemo(
    () => dynamic<typeof rest>(() => import(`./interfaces/${variant}.tsx`)),
    [variant]
  );

  return <Interface {...rest} />;
};
