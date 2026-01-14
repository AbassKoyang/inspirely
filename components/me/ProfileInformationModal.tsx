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

const ProfileInformationModal = () => {
  const { user } = useAuth()
  const [profilePicFile, setProfilePicFile] = useState<File>();
  const [profilePicUrl, setProfilePicUrl] = useState('');

  const form = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      bio: user?.bio || '',
      profile_pic_url: user?.profile_pic_url || 'default',
      phone_number: user?.phone_number || '',
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
    },
  })

  const handleImageUpload  = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? Array.from(e.target.files)[0] : null;
    if (!file) return;
    const url = URL.createObjectURL(file);
    console.log(url)
    setProfilePicFile(file)
    setProfilePicUrl(url)
    form.setValue('profile_pic_url', '' , { shouldValidate: true });
};

  const onSubmit = (data: UpdateUserProfileInput) => {
    console.log('submitted data:', data)
    // call update profile API here
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/25 flex justify-center z-100 overflow-y-auto py-30'>
      <div className="w-full h-fit  max-w-xl bg-white p-6 py-8 rounded-md">
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
                        <Input
                        {...field}
                        className='file:px-0 file:py-0 w-[90px] file:text-emerald-600 border-none bg-white focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black placeholder:text-emerald-600'
                        id={field.name}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        placeholder='Update'
                        />
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
              <Field className='mt-5'>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <Input
                  {...field}
                  className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                  id={field.name}
                  type="text"
                  required
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Last name */}
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
                  required
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Bio */}
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
                  required
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Phone number */}
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
                  required
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Address */}
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
                  required
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* City */}
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
                  required
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
                  required
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
            <Button className='hover:bg-white rounded-4xl bg-white text-emerald-600 border-emerald-600 border cursor-pointer' type="button">
              Cancel
            </Button>
            <Button disabled={!form.formState.isDirty} className='hover:bg-emerald-600 rounded-4xl bg-emerald-600 text-white border-emerald-600 border cursor-pointer' type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileInformationModal
