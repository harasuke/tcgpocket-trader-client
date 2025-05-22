import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignUp, SignedOut } from "@clerk/clerk-react";
import { ClerkAPIError } from "@clerk/types";
import InputPassword from "../components/AuthForm/InputPassword";
import InputEmail from "../components/AuthForm/InputEmail";
import { Button } from "antd";
import { InputFriendcode } from "../components/AuthForm/InputFriendcode";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { AnimatePresence, motion } from "motion/react";

interface RegisterPageProps {}

export default function RegisterPage({}: RegisterPageProps) {
  const [visible, setVisible] = useState(true);
  const { isLoaded, signUp, setActive } = useSignUp();

  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const email = useRef<any>(null);
  const password = useRef<any>(null);
  const [friendCode, setFriendCode] = useState("");

  if (!isLoaded) return;

  const register = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const result = await signUp?.create({
        emailAddress: email?.current?.input?.value ?? "",
        password: password?.current?.input?.value ?? "",
        unsafeMetadata: {
          friendCode: friendCode ?? "",
        },
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      console.log(err?.errors);
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.warn("qui >>>", err);
    }
  };

  return (
    <div
      className="absolute top-0 h-screen w-screen"
      style={{
        backgroundImage: `url("/background-energy-pattern.png")`,
        backgroundSize: `300px, auto`,
      }}
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.form
            className="mx-auto mt-[10em] flex w-[90%] max-w-[400px] flex-col items-center rounded-md border-1 border-gray-200 bg-white shadow-md"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                bounce: 0.4,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                type: "linear",
                duration: 0.5,
              },
            }}
          >
            <img
              className="w-40"
              src="https://ptcgpocket.gg/wp-content/uploads/sites/51/2024/08/Pokemon-Trading-Card-Game-Pocket-Logo.webp"
            ></img>
            <InputEmail className="w-full p-3" errors={errors} ref={email} />
            <InputPassword className="w-full p-3" errors={errors} ref={password} />
            <InputFriendcode onCodeChange={(code) => setFriendCode(code)} />
            <Button type="primary" className="m-3 max-w-[50%]" onClick={(e) => register(e)}>
              Register
            </Button>
            <SignedOut>
              <span className="my-3 text-sm">
                Already registered ? Go to{" "}
                <NavLink
                  className="text-blue-500 underline"
                  to="/signin"
                  onClick={() => setVisible((v) => !v)}
                >
                  Log In
                </NavLink>
              </span>
            </SignedOut>
            {/* <SignedIn>
          <button
            onClick={() => {
              signOut({ redirectUrl: "/signin" });
            }}
          >
            Log out
          </button>
        </SignedIn> */}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
//8153-9734-1789-6429
