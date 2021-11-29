import type { NextPage } from "next";
import { useRouter } from "next/router";
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
  const querryId = router.query.id;

  useEffect(() => {
    if (!querryId) {
      return;
    }
    (async () => {
      const data: { days: Array<{ url: string; id: string; text: string }> } =
        await (
          await fetch(`https://api.npoint.io/add70bdaf588eb3cb38c/`)
        ).json();

      if (data) {
        console.log(data);
        const record = data.days.find(({ id }) => id == querryId);
        console.log(record);
        console.log(router.query.id);
        if (record) {
          seturl(record.url);
          console.log(url);
        }
        setloading(false);
      }
    })();
  }, [querryId]);
  return (
    <div>
      {!loading && (
        <div className={styles.container}>
          {text && <h2>{text}</h2>}
          {url && <YouTube url={url} />}
        </div>
      )}
    </div>
  );
};

export default Home;
