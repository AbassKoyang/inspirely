'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios';
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
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CreateUserInput, createUserSchema, userSchema } from "@/lib/schemas/user"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()

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
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
