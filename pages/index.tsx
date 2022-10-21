import type { NextPage } from "next";
import Head from "next/head";
import Menu from "../components/Menu";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useVotes from "../lib/useVotes";
import moment from "moment";
import Button from "../components/Button";
import { LinkIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { votes, isLoading } = useVotes();
  return (
    <div>
      <Head>
        <title>Jujurly</title>
        <meta name="description" content="Voting App No.1 di Indonesia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      {/* Header */}
      <div className="flex flex-col container mx-auto justify-center py-44 m-auto space-y-3">
        <h1 className="text-center text-5xl font-bold">Ayo Mulai Voting</h1>
        <div className="text-center ">
          <span className="text-lg bg-zinc-100 py-1 px-3 font-medium">
            Web Voting No.1 Di Indonesia
          </span>
        </div>
        <Image
          src="/images/header-image.png"
          alt="Picture of the header"
          width={300}
          height={300}
          priority
          objectPosition="center"
          objectFit="contain"
        />

        <div className="flex flex-row items-center justify-center space-x-5">
          <Link href="/vote/create">
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
      {/* End Header */}

      {/* List Voting */}
      {session && (
        <div className="container mx-auto mb-10">
          <p className="p-5 text-lg  font-bold">Vote Yang Saya Buat 🗳</p>
          {isLoading && <Loading />}
          {votes && votes.length > 0 ? (
            <table className="table-auto w-full border border-zinc-100">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left p-5">No</th>
                  <th className="text-left p-5">Judul</th>
                  <th className="text-left p-5">Kandidat</th>
                  <th className="text-left p-5">Kode</th>
                  <th className="text-left p-5">Mulai</th>
                  <th className="text-left p-5">Selesai</th>
                  <th className="text-left p-5"></th>
                </tr>
              </thead>
              <tbody>
                {votes?.map((vote: any, index: number) => (
                  <tr key={index}>
                    <td className="p-5 text-left">{index + 1}</td>
                    <td className="p-5 text-left font-medium text-blue-500">
                      <a
                        href={`/vote/detail/${vote.code}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {vote.title}
                      </a>
                    </td>
                    <td className="p-5 text-left">
                      {vote.candidates.map((candidate: any, index: number) => (
                        <span key={index}>
                          {candidate.name +
                            (index < vote.candidates.length - 1 ? " vs " : "")}
                        </span>
                      ))}
                    </td>
                    <td className="p-5 text-left font-bold">{vote.code}</td>
                    <td className="p-5 text-left text-sm">
                      {moment(vote.startDateTime).format("DD MMM YYYY hh:mm a")}
                    </td>
                    <td className="p-5 text-left text-sm">
                      {moment(vote.endDateTime).format("DD MMM YYYY hh:mm a")}
                    </td>
                    <td className="p-5 text-left text-sm">
                      <a
                        href={`/participate/${vote.code}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <LinkIcon className="w-8 h-8 p-2 hover:bg-zinc-100 rounded-md" />
                      </a>
                      <a
                        href={`/participate/${vote.code}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <TrashIcon className="w-8 h-8 p-2 hover:bg-zinc-100 rounded-md" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center bg-zinc-100 p-5 font-medium">
              Belum ada Votes yang dibuat
            </div>
          )}
        </div>
      )}
      {/* End List Voting */}
    </div>
  );
};

export default Home;
