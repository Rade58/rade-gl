// import Image from "next/image";
import dynamicLoad from "next/dynamic";

const Scene = dynamicLoad(
  () => {
    return import("@/components/Scene");
  },
  { ssr: false }
);

export const dynamic = "force-static";

export default function Home() {
  return (
    <main>
      <Scene />
    </main>
  );
}
