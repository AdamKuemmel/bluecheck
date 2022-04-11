import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";
function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl${
        !session && "!grid-cols-1 !max-w-3xl"
      }}`}
    >
      {/* section */}
      <section className="col-span-2">
        {/* stories */}
        <Stories />
        {/* posts */}
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          {/* mini profile */}
          <div className="fixed">
            <MiniProfile />
            <Suggestions />
          </div>

          {/* suggestions */}
        </section>
      )}

      {/* section */}
    </main>
  );
}

export default Feed;
