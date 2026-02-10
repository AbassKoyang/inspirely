import { useAuth } from '@/lib/contexts/authContext'
import { UpdateUserProfileInput, updateUserProfileSchema } from '@/lib/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import Image from 'next/image'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from 'sonner'

const ProfileInformationModal = ({isModalOpen, closeModal}:{isModalOpen: boolean; closeModal: () => void}) => {
  const { user } = useAuth()
  const [profilePicFile, setProfilePicFile] = useState<File>();
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      bio: user?.bio || '',
      profile_pic_url: user?.profile_pic_url || '',
      phone_number: user?.phone_number || '',
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
    },
  })

  const handleAddImage  = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? Array.from(e.target.files)[0] : null;
    if (!file) return;
    const url = URL.createObjectURL(file);
    console.log(url)
    setProfilePicFile(file)
    setProfilePicUrl(url)
    form.setValue('profile_pic_url', url , { shouldValidate: true, shouldDirty: true });
};

const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", profilePicFile as File);
    formData.append("upload_preset", "inspirely-profile-picture-preset");

    try {
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const result = await res.json();
          return result.secure_url as string;
    } catch (error) {
        console.error(error)
        toast.error('Sumbission failed: Failed to upload profile image.')
    }
}

const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateUserProfileInput) => {
        try {
            const response = await api.patch(`/api/users/${user?.id}/update/`, data, {withCredentials: true})
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    onMutate: async (variables) => {     
        await queryClient.cancelQueries({ queryKey: ['session-user'] })

      const prevValue = queryClient.getQueryData(['session-user', user?.id]);
      queryClient.setQueryData(['session-user', user?.id], (old: any) => ({
        ...old,
        ...variables,
      }));
  
      return { prevValue };
    },
  
    onError: (_, __, context) => {
      queryClient.setQueryData(['session-user', user?.id], context?.prevValue);
    },
  
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['session-user']});
    },

    onSuccess: () => {
        closeModal();
        toast.success('Profile updated succesfully');
    }
  });

  const onSubmit = async (data: UpdateUserProfileInput) => {
    console.log('submitted data:', data)
    setIsSubmitting(true)
    try {
        let profileImageUrl;
        if(profilePicFile) profileImageUrl = await handleImageUpload()
        console.log(profileImageUrl)
        await updateProfileMutation.mutateAsync({...data, profile_pic_url: profileImageUrl});
    } catch (error) {
        console.error(error)
    } finally{
        setIsSubmitting(false)
    }
  }

  return (
    <div className={`${isModalOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-screen h-dvh flex justify-center z-300`}>
        <div className="size-full overflow-y-auto flex justify-center z-100 py-30">
            <div onClick={closeModal} className="z-10 absolute top-0 left-0 size-full bg-black/25"></div>
            <div className="w-full h-fit  max-w-xl bg-white p-6 py-8 rounded-md z-30">
            <div className="w-full flex items-center justify-center">
            <h3 className='text-lg font-medium font-sans text-black'>
                Profile Information
            </h3>
            </div>

            <form
            id='update-profile-information-form'
            onSubmit={form.handleSubmit(onSubmit)}
            >
            <Controller
                name='profile_pic_url'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel htmlFor="profile-pic-url">Photo</FieldLabel>
                    <div className="w-full flex items-center gap-7">
                        <div className="size-[100px] rounded-full object-cover object-center overflow-hidden mt-2 bg-gray-100/90">
                            <img
                            className=''
                            src={profilePicUrl ? profilePicUrl : user?.profile_pic_url ? user.profile_pic_url : '/assets/images/default-avatar.png'}
                            alt='Profle Picture'
                            />
                        </div>
                        <div className="">
                            <div className="flex items-center gap-5">
                                <Button type='button' className='bg-transparent hover:bg-transparent overflow-hidden flex items-center justify-center relative p-0'>
                                    <p className='text-emerald-700 font-sans text-sm'>Update</p>
                                    <Input
                                    className='z-20 absolute top-0 left-0 size-full opacity-0 file:px-0 file:py-0 w-[90px] file:text-emerald-700 border-none bg-white focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black placeholder:text-emerald-700'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAddImage}
                                    placeholder='Update'
                                    />
                                </Button>

                                <Button type='button' className='bg-transparent hover:bg-transparent overflow-hidden flex items-center justify-center relative p-0'>
                                    <p className='text-red-600 font-sans text-sm'>Remove</p>
                                </Button>
                                <Input
                                {...field}
                                className='hidden'
                                id={field.name}
                                type="text"
                                placeholder=''
                                />
                            </div>
                            <p className='text-black/60 text-sm font-normal font-sans max-w-[350px]'>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                        </div>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='first_name'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-8'>
                    <FieldLabel htmlFor="first-name">First name</FieldLabel>
                    <Input
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                    id={field.name}
                    type="text"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='last_name'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-5'>
                    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                    <Input
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                    id={field.name}
                    type="text"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='bio'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-5'>
                    <FieldLabel htmlFor="bio">Short bio</FieldLabel>
                    <Textarea
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black h-[100px]'
                    id={field.name}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='phone_number'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-5'>
                    <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
                    <Input
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                    id={field.name}
                    type="text"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='address'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-5'>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                    id={field.name}
                    type="text"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='city'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-5'>
                    <FieldLabel htmlFor="city">City</FieldLabel>
                    <Input
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                    id={field.name}
                    type="text"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <Controller
                name='country'
                control={form.control}
                render={({ field, fieldState }) => (
                <Field className='mt-5'>
                    <FieldLabel htmlFor="country">Country</FieldLabel>
                    <Input
                    {...field}
                    className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                    id={field.name}
                    type="text"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                )}
            />

            <div className="w-full flex items-center justify-between mt-8 border-t border-gray-100 pt-5">
                <div className="">
                <p className='text-black text-base font-normal font-sans'>About Page</p>
                <p className='text-black/60 text-sm font-normal font-sans max-w-[80%]'>Personalize with images and more to paint more of vivid portrait of yourself than your 'Short bio.'</p>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <Button onClick={closeModal} className='hover:bg-white rounded-4xl bg-white text-emerald-700 border-emerald-700 border cursor-pointer' type="button">
                Cancel
                </Button>
                <Button disabled={!form.formState.isDirty} className='hover:bg-emerald-700 rounded-4xl bg-emerald-700 text-white border-emerald-700 border cursor-pointer' type="submit">
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default ProfileInformationModal
