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
import { useRouter, useSearchParams } from "next/navigation"
import Script from "next/script"
import axios, { AxiosError } from "axios"
import { api } from "@/lib/api"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const token = useSearchParams().get('token')
    const uid = useSearchParams().get('uid')
  const [isLoading, setisLoading] = useState(false)
  const { user, loading } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (user) {
      window.google?.accounts.id.cancel();
      window.location.replace('/feed')
    }
  }, [user]);

  const resetPasswordFormSchema = z.object({
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required').min(8, 'Password must be at least 8 characters'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: z.infer<typeof resetPasswordFormSchema>) => {
    handleLogin(data);
}

const handleLogin = async (data: z.infer<typeof resetPasswordFormSchema>) => {
  setisLoading(true)
  try {
    if(!token) {
        toast.error("Failed to reset password. Missing fields required")
        return
      }
      if(!uid) {
        toast.error("Failed to reset password. Missing fields required")
        return
        }

    const res = await api.post(
      `/api/auth/password-reset/confirm/`, 
      {
        new_password: data.password,
        token,
        uid
      }, {withCredentials: true}
    )
    const result = res.data
    console.log(result)
    toast.success("Password reset successfull")
    router.replace('/login')
  } catch (err: any) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || "Failed to reset password";
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
          <CardTitle className="text-xl">Create a new password</CardTitle>
          <CardDescription>
            Please note that the new password must be different from the old password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
              name="password"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel htmlFor="email">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
               />

              <Controller
              name="confirmPassword"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel htmlFor="email">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id="confirm-password"
                    type="password"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
               />
          
              <Field>
                <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">{isLoading ? "Reset..." : "Reset password"}</Button>               
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
