import React, { useRef, useState } from "react";
import {
  useSignUp,
  SignInButton,
  SignUp,
  useSignIn,
  SignedIn,
  SignedOut,
  SignOutButton,
  useClerk,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface SignInProps {}

export default function SignInPage({}: SignInProps) {
  const { signUp } = useSignUp();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();

  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
 
  if (!isLoaded) {
    return null
  }

  const logIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn.create({
        strategy: 'password',
        password: password?.current?.value ?? "",
        identifier: email?.current?.value ?? "",
      });

      console.log('result>>>>>', result)
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId});
      }
    } catch(err) {
      console.warn('qui >>>', err)
    }

  };

  return (
    <>
      <form className="flex flex-col">
        <input placeholder="email" id="email" name="email" ref={email}></input>
        <input placeholder="password" id="password" name="password" ref={password}></input>
        <button onClick={(e) => logIn(e)}>Log In</button>
      </form>

      {/* <button onClick={() => signIn.}>Log Out</button> */}
      <br />
      <SignedIn>
        sei loggato, incredibile
        <br />
        <button onClick={() => signOut({ redirectUrl: "/signin" })}>Log out</button>
      </SignedIn>
      <SignedOut>In questo momento devi ancora fare il login</SignedOut>
    </>
  );
}
