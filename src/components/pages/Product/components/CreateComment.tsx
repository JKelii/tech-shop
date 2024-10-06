"use client";
import { createComment } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { publishProductReview } from "@/lib";
import { Router, Send } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";

type FilterFormData = {
  name: string;
  email: string | undefined | null;
  content: string;
  slug: string;
};

const CreateComment = ({ slug }: { slug: string }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FilterFormData>();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const name = session?.user?.name;
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FilterFormData) => {
    const date = new Date().toISOString();
    if (!email) {
      return toast("To add comment you need to be logged in ❌");
    }

    if (email && name) {
      startTransition(async () => {
        const comment = await createComment({
          email,
          content: data.content,
          name,
          slug,
          date,
        });

        if (comment) {
          toast("Comment added ✅");
        }
      });
      form.reset();
      router.refresh();
    }
  };

  return (
    <article className="mt-5 w-full container mx-auto ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex justify-center items-center gap-2">
            Add comment
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              placeholder="Share your thoughts on our tech products..."
              className="min-h-[100px] bg-white w-full "
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 bg-black hover:bg-white text-white transition"
              variant={"outline"}
            >
              {isPending ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <>
                  {" "}
                  <Send />
                  <p className="hover:text-black transition">
                    {" "}
                    Post comment
                  </p>{" "}
                </>
              )}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </article>
  );
};

export default CreateComment;
