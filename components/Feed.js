import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
function Feed() {
  return (
    <main className="grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl">
      {/* section */}
      <section className="col-span-2">
        {/* stories */}
        <Stories />
        {/* posts */}
        <Posts />
      </section>

      {/* section */}
      <section className="hidden xl:inline-grid md:col-span-1">
        {/* mini profile */}
        <div className="fixed">
          <MiniProfile />
          <Suggestions />
        </div>

        {/* suggestions */}
      </section>
    </main>
  );
}

export default Feed;
