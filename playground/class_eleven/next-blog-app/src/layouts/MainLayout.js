import Link from "next/link";

export const MainLayout = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={"/posts"}>Home</Link>
          </li>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>Built with nextjs</footer>
    </>
  );
};
