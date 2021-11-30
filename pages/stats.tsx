import React, { useEffect, useState } from "react";

function Stats() {
  const [loading, setloading] = useState(true);
  const [statsList, setstatsList] = useState(
    new Array<{ id: string; views: number }>()
  );

  useEffect(() => {
    (async () => {
      const data: {
        days: Array<{
          url: string;
          id: string;
          text: string;
          date: string;
        }>;
      } = await (
        await fetch(`https://api.npoint.io/add70bdaf588eb3cb38c/`)
      ).json();

      const result = await Promise.all(
        data.days.map(async (day) => {
          return {
            id: day.id,
            views: (
              await (
                await fetch(
                  `https://api.countapi.xyz/get/swieta3h/wzt${day.id}`
                )
              ).json()
            ).value,
          };
        })
      );
      setstatsList(result);
      console.log(result);
      setloading(false);
    })();
  }, []);

  return (
    <div>
      {!loading && (
        <div>
          {statsList.map((row) => {
            return (
              <p key={row.id}>
                /{row.id}: {row.views} wyświetleń
                <button
                  onClick={async () => {
                    await fetch(
                      `https://api.countapi.xyz/set/swieta3h/wzt${row.id}?value=0`
                    );
                    document.location.reload();
                  }}
                >
                  RESET
                </button>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Stats;
