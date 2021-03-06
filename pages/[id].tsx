import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube from "../components/Youtube";
import { getYoutubeId } from "../lib/getYoutubeId";
import Error from "next/error";
import Packman from "react-spinners/ClipLoader";
import dayjs, { Dayjs } from "dayjs";

import styles from "../styles/Home.module.css";

const Home: NextPage = ({
  now,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      const data: {
        days: Array<{
          url: string;
          id: string;
          text: string;
          date: string;
          openDate?: Dayjs;
        }>;
      } = await (
        await fetch(`https://api.npoint.io/add70bdaf588eb3cb38c/`)
      ).json();

      if (data) {
        const record = data.days.find(({ id }) => id == querryId);
        if (record) {
          fetch(`https://api.countapi.xyz/hit/swieta3h/wzt${querryId}`);
          record.openDate = dayjs(record.date, "YYYY-MM-DD").hour(0).minute(0);
          const today = dayjs(now);
          if (today.isAfter(record.openDate) || !record.date) {
            seturl(record.url);
            settext(record.text);
          } else {
            settext(":D Ten kod nie jest na dzisiaj :D");
          }
        }
        setloading(false);
      }
    })();
  }, [querryId]);
  return (
    <div>
      {!loading ? (
        <div className={styles.container}>
          {text && <h2>{text}</h2>}
          {url && <YouTube url={url} />}
        </div>
      ) : (
        <div className={styles.container}>
          <Packman color="#000000" loading={true} />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const now = dayjs().toISOString();
  return {
    props: {
      now: now,
    }, // will be passed to the page component as props
  };
};

export default Home;
