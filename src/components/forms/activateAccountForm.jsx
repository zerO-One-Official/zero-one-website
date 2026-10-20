"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { resetPassword } from "@/action/user";
import StyledInput from "../input/StyledInput";
import Button from "../button/Button";
import { MdOutlineCloudDone } from "react-icons/md";

const ActivateAccountForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const next = searchParams.get("next");
  //   if (!token) redirect("/login");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    loading: false,
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.loading || !token) return;
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));
    try {
      const result = await resetPassword(token, form.password);
      toast[result.type](
        result.success && next
          ? "Password set. Continue with your alumni journey."
          : result.message,
      );
      if (result.success) {
        let destination = "/login";
        if (next) {
          try {
            const url = new URL(next, window.location.origin);
            if (url.origin === window.location.origin) {
              destination = `${url.pathname}${url.search}${url.hash}`;
            }
          } catch {}
        }
        router.push(destination);
      }
    } catch (error) {
      toast.error(error.message || "Unable to activate your account.");
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div>
      {
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-11/12 mx-auto"
        >
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 justify-between items-start xl:items-center flex-wrap">
            <StyledInput
              disabled={form.loading}
              id="password"
              value={form.password}
              onChange={handleChange}
              name="password"
              label="Create Password"
              required
              minLength={6}
              className="w-full"
              type="password"
            />
            <StyledInput
              disabled={form.loading}
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              label="Re-enter Password"
              required
              className="w-full"
              type="password"
            />
          </div>

          {/* <p className='text-base'>Already a member ? <Link href="/login" className='text-accent hover:underline'>Login</Link></p> */}

          <Button
            disabled={form.loading}
            variant={"filled"}
            type="submit"
            className={"ml-auto"}
            loading={form.loading}
          >
            <MdOutlineCloudDone className="fill-inherit" />
            Activate Account
          </Button>
        </form>
      }
    </div>
  );
};

export default ActivateAccountForm;
