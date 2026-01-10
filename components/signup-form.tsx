'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
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
import { CreateUserInput, createUserSchema, userSchema } from "@/lib/schemas/user"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAuth } from "@/lib/contexts/authContext";


declare global {
  interface Window {
    google: any;
  }
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isLoading, setisLoading] = useState(false)
  const router = useRouter()
  const googleButtonRef = useRef<HTMLDivElement>(null)

  const { user, loading } = useAuth();
  const [gisLoaded, setGisLoaded] = useState(false);  
  console.log(user);

  
  const handleGoogleResponse = async (response: any) => {
    try {
      const formData = new FormData();
      formData.append("token", response.credential)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google_login/`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error("Google login failed");
      }

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
        text: "signup_with",
        shape: "rectangular",
      });
    }

    google.accounts.id.prompt();

    return () => {
      google.accounts.id.cancel();
    };
  }, [gisLoaded]);

  // useEffect(() => {
  //   if (user) {
  //     window.google?.accounts.id.cancel();
  //   }
  // }, [user]);
    
    const form = useForm<CreateUserInput>({
      resolver: zodResolver(createUserSchema),
      defaultValues: {
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        registration_method: 'email'
      }
    })

    const onSubmit = (data: CreateUserInput) => {
        handleSignUp(data);
    }

    const handleSignUp = async (data: CreateUserInput) => {
      setisLoading(true)
    
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
          }
        )
    
        if (!res.ok) {
          const error = await res.json()
          toast.error(error.detail ?? "Signup failed")
          return
        }
    
        const result = await res.json()
        console.log(result)
    
        toast.success("Account created successfully")
        router.push("/")
    
      } catch (err) {
        toast.error("Something went wrong")
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
          Sign up with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <div ref={googleButtonRef}></div>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
              <Controller
              name='first_name'
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                  <Input 
                  {...field}
                  id={field.name} 
                  type="text" 
                  placeholder="John"
                  required />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
               />
              <Controller
              name='last_name'
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                  <Input
                  {...field}
                   id={field.name} 
                   type="text" 
                   placeholder="Doe" 
                   required />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
               />
              <Controller
              name='email'
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                  {...field}
                    id={field.name}
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
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input 
                  {...field}
                  id={field.name}
                  type="password" 
                  required />
                  <FieldDescription>
                  Must be at least 8 characters long.
                  </FieldDescription>
                  {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                </Field>
              )}
                />
              <Field>
                <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">{isLoading ? "Creating account..." : "Create Account"}</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
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
