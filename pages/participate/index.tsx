import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Form from "../../components/Form";
import RestrictedPage from "../../components/page/RestrictedPage";

export default function Participate() {
  const router = useRouter();

  const { data: session } = useSession();

  if (!session) {
    return <RestrictedPage />;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5 container mx-auto">
      <Head>
        <title>Berhasil Membuat Voting</title>
      </Head>
      <Image
        src={"/images/participate.png"}
        alt="thinking"
        width={200}
        height={180}
        objectFit="contain"
      />
      <h1 className="text-4xl font-bold">Ikutan Voting </h1>
      <h2 className="w-1/2 text-center">
        Untuk ikutan voting, kamu harus memasukkan kode voting yang sudah di
        berikan panitia/penyelenggara
      </h2>
      <Form
        placeholder="Masukkan Kode Voting"
        value={""}
        onChange={() => {}}
        className="w-1/3 mt-3"
      />
      <Button
        onClick={() => {
          router.push("/participate/kode");
        }}
        text="Lanjutkan"
        size="lg"
        className="w-1/3"
      />
    </div>
  );
}
