import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import YouTube from "../components/Youtube";
import { getYoutubeId } from "../lib/getYoutubeId";
import Error from "next/error";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [loading, setloading] = useState(true);
  const [url, seturl] = useState("");
  const [text, settext] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await (
        await fetch(`https://api.npoint.io/add70bdaf588eb3cb38c/`)
      ).json();
    })();
  }, []);
  return (
    <div>
      {loading ?? (
        <div className={styles.container}>
          {text ?? <h2>{text}</h2>}
          {url ?? <YouTube url={url} />}
        </div>
      )}
    </div>
  );
};

export default Home;
