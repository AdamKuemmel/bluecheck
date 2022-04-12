import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  gitreturn(
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center px-14 ">
        <img
          className="pl-[40px] w-80"
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Usethis_on_web.png"
          alt=""
        />

        <p className="italic font-xs w-80">
          Welcome to Adam Kuemmels social media example. Right now you are using
          next-auth to authenticate a login session. Some other technologoies
          displayed in the project are Firebase for the live feed(you can
          upload, comment and like!), Recoil for global state management,
          TailwindCSS for utility first UI, FakerJS for fake data, plus many
          advanced react techniques. Feel free to contact me and ask any
          questions!
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 text-white bg-blue-500 rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
