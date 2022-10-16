import type { NextPage } from "next";
import Head from "next/head";
import Menu from "../components/Menu";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto h-screen">
      <Head>
        <title>Jujurly</title>
        <meta name="description" content="Voting App No.1 di Indonesia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <div className="flex flex-col h-full justify-center  m-auto space-y-3">
        <h1 className="text-center text-5xl font-bold">Ayo Mulai Voting</h1>
        <h2 className="text-center text-lg">Web Voting No.1 Di Indonesia</h2>
        <Image
          src="/images/header-image.png"
          alt="Picture of the header"
          width={300}
          height={300}
          objectPosition="center"
          objectFit="contain"
        />

        <div className="flex flex-row items-center justify-center space-x-5">
          <Link href="/new-vote">
            <a className="bg-zinc-800 text-sm font-bold text-white w-40 text-center py-3 border-2 border-transparent hover:bg-zinc-200 hover:text-zinc-800">
              Buat Vote Baru
            </a>
          </Link>
          <span>atau</span>
          <Link href="/participate">
            <a className="bg-white text-sm font-bold text-zinc-800  border-zinc-800 border-2 w-40 text-center py-3 hover:bg-zinc-800 hover:text-white">
              Ikutan Vote
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
