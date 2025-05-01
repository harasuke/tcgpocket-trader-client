import React, { useRef, useState } from "react";
import { useSignIn, SignedOut } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { ClerkAPIError } from "@clerk/types";
import InputPassword from "src/components/AuthForm/InputPassword";
import InputEmail from "src/components/AuthForm/InputEmail";
import { Button } from "antd";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";

interface SignInProps {}

export default function SignInPage({}: SignInProps) {
  const [visible, setVisible] = useState(true);
  const { isLoaded, signIn, setActive } = useSignIn();

  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const email = useRef<any>(null);
  const password = useRef<any>(null);

  if (!isLoaded) {
    return null;
  }

  const logIn = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setErrors(undefined);

    try {
      console.log("valori form email: ", email, "psw:", password);
      const result = await signIn.create({
        strategy: "password",
        password: password?.current?.input?.value ?? "",
        identifier: email?.current?.input?.value ?? "",
      });

      console.log("result>>>>>", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      else console.error("Unhandle Exception >", err);

      console.error(JSON.stringify(err, null, 2));
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
            className="mx-auto mt-[15em] flex w-[90%] max-w-[400px] flex-col items-center rounded-md border-1 border-gray-200 bg-white shadow-md"
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
            <Button type="primary" className="m-3 max-w-[50%]" onClick={(e) => logIn(e)}>
              Log In
            </Button>
            <SignedOut>
              <span className="my-3 text-sm">
                Don't have an account yet ?!{" "}
                <NavLink
                  to="/register"
                  className="text-blue-500 underline"
                  onClick={() => setVisible((v) => !v)}
                >
                  Register
                </NavLink>
              </span>
            </SignedOut>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
