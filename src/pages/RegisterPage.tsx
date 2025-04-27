import { useSignUp, SignedOut, SignedIn, useClerk } from "@clerk/clerk-react";
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

interface RegisterPageProps {}

export default function RegisterPage({}: RegisterPageProps) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useClerk();

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const friendCode = useRef<HTMLInputElement>(null);

  if (!isLoaded) return;

  const register = async (e) => {
    e.preventDefault();

    try {
      const result = await signUp?.create({
        emailAddress: email?.current?.value,
        password: password?.current?.value,
        unsafeMetadata: {
          friendCode: friendCode?.current?.value,
        },
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      console.warn("qui >>>", err);
    }
  };

  return (
    <>
      <SignedIn>
        Before registering, you must{" "}
        <button onClick={() => signOut({ redirectUrl: "/register" })}>Log out</button>
      </SignedIn>
      <SignedOut>
        <form className="flex flex-col">
          <input placeholder="email" id="email" name="email" ref={email}></input>
          <input placeholder="password" id="password" name="password" ref={password}></input>
          <input
            placeholder="friendCode"
            id="friendCode"
            name="friendCode"
            ref={friendCode}
          ></input>
          <button onClick={(e) => register(e)}>Register</button>
          <p>
            Already registered ? Go to <NavLink to="/signin">Log In</NavLink>
          </p>
        </form>
      </SignedOut>
    </>
  );
}
