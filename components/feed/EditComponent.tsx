import { PostType, UpdatePostInput, updatePostSchema } from '@/lib/schemas/post';
import {motion} from 'motion/react'
import { useMemo, useState } from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { Button } from '@/components/ui/button'
import { Bell, Ellipsis, ImagePlus, RotateCcw, X } from 'lucide-react'
import { StarterKit } from "@tiptap/starter-kit"
import { Image as TipTapImage } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"
import { useEditor } from '@tiptap/react';
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchCategories, useFetchPost, useFetchTags } from '@/lib/queries';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

const EditComponent = ({post,isSidebarOpen ,closeSidebar}:{post:PostType; isSidebarOpen: boolean; closeSidebar: () => void}) => {
    const [thumbnail, setThumbnail] = useState(post.thumbnail);
    const [isUploading, setisUploading] = useState(false)
    const [isSubmmitting, setIsSubmmitting] = useState(false);
    const [wordCount, setwordCount] = useState(post.word_count||0)
    const [paragraphCount, setParagraphCount] = useState(post.paragraph_count||0)
    const [readTime, setreadTime] = useState(post.read_time||0)
    const router = useRouter();


    const form = useForm<UpdatePostInput>({
        resolver: zodResolver(updatePostSchema),
        defaultValues: {
        title: post?.title || '',
        subtitle: post?.subtitle || '',
        content: post?.content || '',
        thumbnail: post?.thumbnail || '',
        },
    })


    const editor = useEditor({
        immediatelyRender: false,
        editorProps: {
        attributes: {
            autocomplete: "off",
            autocorrect: "on",
            autocapitalize: "on",
            "aria-label": "Main content area, start typing to enter text.",
            class: "simple-editor",
        },
        },
        extensions: [
        StarterKit.configure({
            horizontalRule: false,
            link: {
            openOnClick: false,
            enableClickSelection: true,
            },
        }),
        HorizontalRule,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Highlight.configure({ multicolor: true }),
        TipTapImage,
        Typography,
        Superscript,
        Subscript,
        Selection,
        ImageUploadNode.configure({
            accept: "image/*",
            maxSize: MAX_FILE_SIZE,
            limit: 3,
            upload: handleImageUpload,
            onError: (error) => console.error("Upload failed:", error),
        }),
        ],
        content: post?.content || '',
        onUpdate({editor}){
        const text = editor.getText()
        const html = editor.getHTML()
        form.setValue('content',html, {shouldValidate: true, shouldDirty: true})
        calculateWordCount(text)      
        calculateParagraphCount(text)
        calculateReadtime(text)      
        }
    })


    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setisUploading(true)
        const file = e.target.files ? Array.from(e.target.files)[0] : null;
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file as File);
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
            const url =  result.secure_url as string;
            setThumbnail(url)
            form.setValue("thumbnail", url, {shouldValidate: true})
        } catch (error) {
            console.error(error)
            toast.error('Failed to upload thumbnail.')
        } finally {
        setisUploading(false)
        }
    }

    const onSubmit = async (data: UpdatePostInput) => {
    console.log("Submitted data:", data)
    setIsSubmmitting(true)
        try {
            const response =  await api.patch(`/api/posts/${post.id}/update/`, {
            ...data,
            content: editor?.getHTML() || '',
            read_time: readTime,
            word_count: wordCount,
            paragraph_count: paragraphCount
            }, {withCredentials: true})
            console.log(response.data)
            toast.success("Article updated successfully")
            router.push('/feed')
            return response.data
        } catch (error) {
            console.error("error creating article", error)
            toast.error("Failed to update post")
        }finally{
        setIsSubmmitting(false)
        }
    }

    console.log(editor?.getText())
    console.log(editor?.getHTML())

    const calculateWordCount = (content:string) => {
    const count = content.split(/\s+/).length
    setwordCount(count)
    }
    const calculateParagraphCount = (content:string) => {
    const count = content.split(/\n\s*\n+/).length
    setParagraphCount(count)
    }

    const calculateReadtime = (content: string) => {
    const readTime = Math.ceil(content.split(/\s+/).length/225)
    setreadTime(readTime)
    }
  return (
    <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mt-5">
        {thumbnail && (
          <div className="w-full h-[300px] object-cover object-center overflow-hidden relative">
            <img
            className='w-full'
            src={thumbnail}
            alt='Thumbnail'
            />
            <button type="button" onClick={()=> {setThumbnail(''); form.setValue('thumbnail', '', {shouldValidate: true, shouldDirty: true})}} className='absolute top-5 right-5 z-20 p-2 bg-white rounded-full cursor-pointer'>
              <X className='size-[20px] text-black/70'/>
            </button>
         </div>
        )}
        <div className="flex">
          {isUploading ? (
            <div className='flex items-center gap-3 py-[5px] px-3'>
              <RotateCcw strokeWidth={2} className='size-[20px] text-black/60 animate-spin' />
              <p className='text-black/60 text-base font-medium font-sans'>Uploading...</p>
            </div>
          ):
          (
            <>
              {!thumbnail && (
                <button className="flex items-center gap-3 py-[5px] px-3 bg-white hover:bg-gray-100/90 transition-all duration-300 ease-in-out rounded-4xl relative">
                <input
                className='z-20 opacity-0 size-full absolute top-0 left-0'
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                placeholder='Update'
                />
                <ImagePlus  strokeWidth={2} className='size-[20px] text-black/60' />
                <p className='text-black/60 text-base font-medium font-sans'>Add Cover</p>
              </button>
              )}
            </>
          )}
        </div>
        <div className="w-full mt-3">
          <textarea defaultValue={post.title} onChange={(e) => form.setValue('title', e.target.value, {shouldValidate: true, shouldDirty: true})} className='w-full min-h-[50px] h-[50px] md:min-h-[60px] md:h-fit max-h-fit bg-white text-xl md:text-5xl font-bold outline-0 stroke-0 border-0 placeholder:text-black/65' placeholder='Article Title...'></textarea>
        </div>
      </div>
      <div className="w-full max-w-4xl overflow-x-hidden mt-5">
          <SimpleEditor  editor={editor}/>
      </div>

      <motion.div className='w-[450px] fixed top-0 right-0 bg-white shadow-xl h-dvh z-200' initial={{x:'110%'}} animate={{x: isSidebarOpen ? 0 : '110%', animationDuration: 0.5, transition: {type: 'tween'}}}>
        <div className="w-full h-full relative overflow-auto">
          <div className="w-full py-8 px-8 border-b border-gray-100 sticky top-0 bg-white flex items-center justify-between">
            <h2 className='font-sans text-xl text-black font-semibold leading-1'>Draft Settings</h2>
            <button onClick={closeSidebar} className='p-2 bg-white rounded-full cursor-pointer'>
              <X className='size-[20px] text-black/70'/>
            </button>
          </div>
          <div className="w-full px-8 mt-8">
            <div className="w-full bg-gray-100/90 rounded-xs p-3 px-4 flex items-center justify-between">
              <div className="">
                <h6 className='text-black/70 font-medium font-sans text-base'>Word count</h6>
                <p className='text-black/60 font-normal font-sans text-sm mt-3'>{wordCount} {wordCount > 1 ? 'words' : 'word'}</p>
              </div>
              <div className="">
                <h6 className='text-black/70 font-medium font-sans text-base'>Paragraph</h6>
                <p className='text-black/60 font-normal font-sans text-sm mt-3'>{paragraphCount} {paragraphCount > 1 ? 'paragraphs' : 'paragraph'}</p>
              </div>
              <div className="">
                <h6 className='text-black/70 font-medium font-sans text-base'>Read time</h6>
                <p className='text-black/60 font-normal font-sans text-sm mt-3'>{readTime} mins</p>
              </div>
            </div>
          </div>

          <form className='w-full mt-8 px-8 pb-0' onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                  name='subtitle'
                  control={form.control}
                  render={({ field, fieldState }) => (
                  <Field className='mt-8'>
                      <FieldLabel htmlFor="subtitle">Preview subtitle</FieldLabel>
                      <Textarea
                      {...field}
                      className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black h-[100px]'
                      id={field.name}
                      ></Textarea>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                  )}
              />
              <div className="w-full py-5 px-8 border-t border-gray-100 sticky bottom-0 bg-white flex items-center justify-end mt-8 mb-0">
                <button disabled={isSubmmitting || !form.formState.isDirty} type='submit' className='text-sm py-[5px] px-4.5 text-white bg-emerald-700/90 hover:bg-emerald-700 rounded-4xl transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-30'>
                {isSubmmitting ? 'Publishing...' : ' Publish'}
                </button>
              </div>
          </form>
        </div>
        </motion.div>
        </div>
  )
}

export default EditComponent