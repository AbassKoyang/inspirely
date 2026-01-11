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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isLoading, setisLoading] = useState(false)
  const googleButtonRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, loading } = useAuth();
  const [gisLoaded, setGisLoaded] = useState(false);  
  console.log(user);

  const handleGoogleResponse = async (response: any) => {
    try {
      const formData = new FormData();
      formData.append("token", response.credential)

      const res = await api.post(`/api/auth/google_login/`, formData, {withCredentials: true})

      toast.success("Logged in with Google");
      router.push("/");
    } catch (error) {
      console.error(error)
      toast.error("Google authentication failed")
    }
  }

  useEffect(() => {
    if (!gisLoaded) return;

    const google = window.google;

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleGoogleResponse,
    });

    if (googleButtonRef.current) {
      google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "sign_in_with",
        shape: "rectangular",
      });
    }

    google.accounts.id.prompt();

    return () => {
      google.accounts.id.cancel();
    };
  }, [gisLoaded]);

  useEffect(() => {
    if (user) {
      window.google?.accounts.id.cancel();
      router.push('/')
    }
  }, [user]);

  const loginFormSchema = z.object({
    email: z.email('Enter a valid email adress'),
    password: z.string()
  })

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    handleLogin(data);
}

const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
  setisLoading(true)

  try {
    const res = await api.post(
      `/api/auth/login/`, data, {withCredentials: true}
    )
    const result = await res.data
    console.log(result)

    toast.success("Logged in successfully")
    router.push("/")

  } catch (err: any) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || "Login failed";
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
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGisLoaded(true)}
      />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <div ref={googleButtonRef}>
                  
                </div>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
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
              <Controller
              name="password"
              control={form.control}
              render={({field, fieldState}) => (
                <div className="flex items-center">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                </div>
              )}
               />
          
              <Field>
                <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">{isLoading ? "Logging in..." : "Log in"}</Button>               
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
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
