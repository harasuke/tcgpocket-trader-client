import React, { useContext, useRef, useState } from "react";
import { useSignIn, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { ClerkAPIError } from "@clerk/types";
import InputPassword from "../components/InputPassword";
import InputEmail from "../components/InputEmail";
import { useAuthToken } from "../utils/UseAuthToken";
import { StoreContext } from "../stores/StoreContext";

interface SignInProps {}

export default function SignInPage({}: SignInProps) {
  const storeContext = useContext(StoreContext);
  const { getToken } = useAuthToken();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();

  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return null;
  }

  const logIn = async (e) => {
    e.preventDefault();
    setErrors(undefined);

    try {
      const result = await signIn.create({
        strategy: "password",
        password: password?.current?.value ?? "",
        identifier: email?.current?.value ?? "",
      });

      console.log("result>>>>>", result);

      if (result.status === "complete") {
        storeContext?.setIsLoggedIn(true);
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      else console.error("Unhandle Exception >", err);

      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <div>{errors?.map((x, index) => <p key={index}>{x.longMessage}</p>)}</div>
      <div>lo sto calcolando da solo: {storeContext?.isLoggedIn.toString()}</div>
      <br />
      <form className="flex flex-col">
        <InputEmail errors={errors} ref={email}></InputEmail>
        <InputPassword errors={errors} ref={password}></InputPassword>
        <button onClick={(e) => logIn(e)}>Log In</button>
      </form>
      <button
        onClick={async () => {
          console.log(await getToken());
        }}
      >
        Prendi il token{" "}
      </button>

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
