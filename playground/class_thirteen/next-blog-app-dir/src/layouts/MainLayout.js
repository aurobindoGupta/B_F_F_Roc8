import Link from "next/link";

export const MainLayout = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>

          <li>
            <Link href={"/posts/new"}>New Post</Link>
          </li>
          <li>
            <Link href={"/posts/new-client"}>New Client</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>
        <b>Footer:</b> This page is built with Next.js
      </footer>
    </>
  );
};
