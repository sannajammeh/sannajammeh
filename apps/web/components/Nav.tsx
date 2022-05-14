import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { FiGithub } from "react-icons/fi";
import clsx from "clsx";

export default function Nav() {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", startProgressBar);

    router.events.on("routeChangeComplete", stopProgressBar);

    router.events.on("routeChangeError", stopProgressBar);

    return () => {
      router.events.off("routeChangeStart", startProgressBar);
      router.events.off("routeChangeComplete", stopProgressBar);
      router.events.off("routeChangeError", stopProgressBar);
    };
  }, []);

  return (
    <div
      className={clsx(
        `top-0 left-0 w-full z-50`,
        router.pathname === "/" ? "absolute" : "sticky"
      )}
    >
      <header className="mx-auto py-4 container font-bold font-space-mono">
        <nav className="w-full flex justify-between">
          <div>
            <Link href="/">
              <a title="Home">S. JAMMEH</a>
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <NavItem
              title="Blog"
              href="/blog"
              active={router.pathname.includes("/blog")}
            >
              Blog
            </NavItem>
            {/* <NavItem title="About" href="/about">
              About
            </NavItem> */}
            <a
              className="leading-none"
              href="https://github.com/sannajammeh"
              target="_blank"
              title="GitHub"
            >
              <span className="hidden md:inline-block">GitHub</span>
              <FiGithub className="md:hidden" size="1.25rem" />
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

const NavItem = ({
  href,
  children,
  className = "",
  active = undefined,
  ...rest
}) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        {...rest}
        className={`${
          typeof active === "boolean"
            ? active
            : router.pathname === href
            ? "border-b border-radix-slate12"
            : ""
        } ${className}`}
      >
        {children}
      </a>
    </Link>
  );
};

// Config delay shim
let progressBarTimeout: NodeJS.Timeout = null;

const startProgressBar = () => {
  clearTimeout(progressBarTimeout);
  progressBarTimeout = setTimeout(NProgress.start, 200);
};

const stopProgressBar = () => {
  clearTimeout(progressBarTimeout);
  NProgress.done();
};

NProgress.configure({ showSpinner: false, delay: 150 });
