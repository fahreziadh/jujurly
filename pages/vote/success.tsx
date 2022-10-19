import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../../components/Button";

export default function Success() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5">
      <Head>
        <title>Berhasil Membuat Voting</title>
      </Head>
      <Image
        src={"/images/success.png"}
        alt="thinking"
        width={433}
        height={322}
        objectFit="contain"
      />
      <h1 className="text-4xl font-bold">Yeayy! Voting Berhasil Dibuat 🎉</h1>
      <h2>Kamu bisa menyebarkan kode voting Jujurly dibawah ini</h2>
      <Button
        onClick={() => {
          router.push("/");
        }}
        text="Cek Status"
        size="lg"
      />
    </div>
  );
}
