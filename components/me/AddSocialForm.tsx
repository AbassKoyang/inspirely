import { useAuth } from '@/lib/contexts/authContext'
import { UpdateUserProfileInput, updateUserProfileSchema } from '@/lib/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FormEvent, useState } from 'react'
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

const AddSocialForm = ({isModalOpen, closeModal, social}:{isModalOpen: boolean; closeModal: () => void; social: 'github' | 'website' | 'instagram' | 'linkedin' | 'twitter';}) => {
  const { user } = useAuth()
  const [link, setLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  type socialType = {
    github?: string;
    website?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  }
const updateProfileMutation = useMutation({
    mutationFn: async (data: socialType) => {
        setIsSubmitting(true)
        try {
            const response = await api.patch(`/api/users/${user?.id}/update/`, data, {withCredentials: true})
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setIsSubmitting(false)
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({[social] : link})
  }

  return (
    <div className={`${isModalOpen ? 'block' : 'hidden'} fixed top-0 left-0 w-screen h-dvh flex justify-center z-300`}>
        <div className="size-full overflow-y-auto flex justify-center items-center z-100 py-15 px-4 lg:py-30">
            <div onClick={closeModal} className="z-10 absolute top-0 left-0 size-full bg-black/25"></div>
            <div className="w-full h-fit  max-w-xl bg-white p-6 py-8 rounded-md z-30">
            <div className="w-full flex items-center justify-center">
            <h3 className='text-lg font-medium font-sans text-black capitalize'>
                Add {social}
            </h3>
            </div>

            <form onSubmit={handleSubmit} className='mt-8'>
                <Input
                required
                placeholder='https://example.com'
                onChange={(e) => setLink(e.target.value)}
                className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                type="url"
                />
                 <div className="mt-6 flex justify-end gap-3">
                    <Button onClick={closeModal} className='hover:bg-white rounded-4xl bg-white text-emerald-700 border-emerald-700 border cursor-pointer' type="button">
                    Cancel
                    </Button>
                    <Button className='hover:bg-emerald-700 rounded-4xl bg-emerald-700 text-white border-emerald-700 border cursor-pointer' type="submit">
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default AddSocialForm
