import { MainLayout } from "@/layouts/MainLayout";

export default function about() {
  return <h1>ABOUT PAGE!!</h1>;
}

about.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
