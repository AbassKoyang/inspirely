'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import z from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/lib/contexts/authContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Script from "next/script"
import axios, { AxiosError } from "axios"
import { api } from "@/lib/api"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isLoading, setisLoading] = useState(false)
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      window.google?.accounts.id.cancel();
      window.location.replace('/feed')
    }
  }, [user]);

  const loginFormSchema = z.object({
    email: z.email('Enter a valid email adress'),
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
    }
  })

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    handleLogin(data);
}

const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
  setisLoading(true)

  try {
    const res = await api.post(
      `/api/auth/password-reset/`, data, {withCredentials: true}
    )
    const result = res.data
    console.log(result)

    toast.success("Email sent successfully")
  } catch (err: any) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || "Failed to send email";
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong");
    }
    console.error(err)
  } finally {
    setisLoading(false)
  }
}
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot password</CardTitle>
          <CardDescription>
          Please enter the email registered with the application to receive a password reset email.          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
              name="email"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
               />
          
              <Field>
                <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">{isLoading ? "Sending..." : "Send password reset link"}</Button>               
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
