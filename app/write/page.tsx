'use client';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { Button } from '@/components/ui/button'
import { Bell, Ellipsis, ImagePlus, RotateCcw, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useAuth } from '@/lib/contexts/authContext'
import {motion} from 'motion/react'
import { useMemo, useState } from 'react';
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
import { CreatePostInput, createPostSchema } from '@/lib/schemas/post';
import { useFetchCategories, useFetchTags } from '@/lib/queries';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const WritePage = () => {
  const {user} = useAuth()
  const [isSidebarOpen, setisSidebarOpen] = useState(false)
  const {data:categories} = useFetchCategories()
  const {data:tags} = useFetchTags()
  const [tagField, settagField] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState('');
  const [isUploading, setisUploading] = useState(false)
  const [isSubmmitting, setIsSubmmitting] = useState(false);
  const [wordCount, setwordCount] = useState(0)
  const [paragraphCount, setParagraphCount] = useState(0)
  const [readTime, setreadTime] = useState(0)
  const router = useRouter();


  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      content: '',
      slug: '',
      thumbnail: '',
      category: '',
      tags: [],
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
    content: 'Tell your story...',
    onUpdate({editor}){
      const text = editor.getText()
      calculateWordCount(text)      
      calculateParagraphCount(text)
      calculateReadtime(text)      
    }
  })


  const addTagToSelectedTags = (tag: string) => {
    const index = selectedTags.findIndex((selectedTag) => selectedTag == tag)
    console.log(index)
    if(index !== -1) return
    const newtags = [...selectedTags, tag]
    setSelectedTags(newtags)
    form.setValue("tags", selectedTags, {shouldValidate: true})
  }

  const removeTagFromSelectedTags = (tag: string) => {
    const index = selectedTags.findIndex((selectedTag) => selectedTag == tag)
    const duplicate = [...selectedTags]
    if(index !== -1){
      duplicate.splice(index, 1)
    }
    const newtags = [...duplicate]
    setSelectedTags(newtags)
    form.setValue("tags", selectedTags, {shouldValidate: true})
  }

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

const onSubmit = async (data: CreatePostInput) => {
  console.log("Submitted data:", data)
  setIsSubmmitting(true)
  console.log(generateArticleSlug(data.title))
    try {
        const response =  await api.post(`/api/posts/`, {
          ...data,
          slug: generateArticleSlug(data.title),
          tags: selectedTags,
          content: editor?.getHTML() || '',
          category_id: Number(data.category),
          read_time: readTime,
          word_count: wordCount,
          paragraph_count: paragraphCount
        }, {withCredentials: true})
        console.log(response.data)
        toast.success("Article posted successfully")
        // router.push('/feed')
        return response.data
    } catch (error) {
        console.error("error creating article categories", error)
        toast.error("Failed to create post")
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

const generateArticleSlug = (title:string) => {
  const truncatedTitle = title.length > 50 ? title.slice(0, 50) : title
  return truncatedTitle.toLowerCase().replaceAll(' ', '-').replaceAll(".", '')
}

const calculateReadtime = (content: string) => {
  const readTime = Math.ceil(content.split(/\s+/).length/225)
  setreadTime(readTime)
}

  return (
    <section className='w-full min-h-dvh flex items-center flex-col bg-white'>
      <div className="w-full max-w-5xl flex items-center justify-between py-4">
        <Link href="/" className="text-xl md:text-3xl font-bold text-emerald-700 transition-colors hover:text-emerald-700">
              Inspirely
        </Link>

        <div className="flex items-center gap-7">
          <button onClick={() => setisSidebarOpen(!isSidebarOpen)} className='text-xs py-[5px] px-4.5 text-white bg-emerald-700/90 hover:bg-emerald-700 rounded-4xl transition-all duration-200 ease-in-out cursor-pointer'>
            Publish
          </button>

          <div className='flex items-center gap-5 md:gap-5'>
              <button className='cursor-pointer'>
                <Ellipsis strokeWidth={1} className='size-5.5 text-black/70 hover:text-black transition-all duration-200 ease-in-out' />
              </button>

              <Link href='#'>
                <Bell strokeWidth={1} className='size-5.5 text-black/70 hover:text-black transition-all duration-200 ease-in-out' />
              </Link>

              <button className='size-[35px] rounded-full overflow-hidden object-center object-cover cursor-pointer'>
                <Image
                className=''
                src={user?.profile_pic_url? user.profile_pic_url : defaultAvatar}
                width={35}
                height={35}
                alt='Profle Picture'
                />
              </button>
            </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-5">
        {thumbnail && (
          <div className="w-full h-[300px] object-cover object-center overflow-hidden relative">
            <img
            className='w-full'
            src={thumbnail}
            alt='Thumbnail'
            />
            <button type="button" onClick={()=> setThumbnail('')} className='absolute top-5 right-5 z-20 p-2 bg-white rounded-full cursor-pointer'>
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
          <textarea onChange={(e) => form.setValue('title', e.target.value, {shouldValidate: true})} className='w-full min-h-[50px] h-[50px] md:min-h-[60px] md:h-fit max-h-fit bg-white text-xl md:text-5xl font-bold outline-0 stroke-0 border-0 placeholder:text-black/65' placeholder='Article Title...'></textarea>
        </div>
      </div>
      <div className="w-full max-w-4xl overflow-x-hidden mt-5">
          <SimpleEditor  editor={editor}/>
      </div>

      <motion.div className='w-[450px] fixed top-0 right-0 bg-white shadow-xl h-dvh z-200' initial={{x:'110%'}} animate={{x: isSidebarOpen ? 0 : '110%', animationDuration: 0.5, transition: {type: 'tween'}}}>
        <div className="w-full h-full relative overflow-auto">
          <div className="w-full py-8 px-8 border-b border-gray-100 sticky top-0 bg-white flex items-center justify-between">
            <h2 className='font-sans text-xl text-black font-semibold leading-1'>Draft Settings</h2>
            <button onClick={() => setisSidebarOpen(false)} className='p-2 bg-white rounded-full cursor-pointer'>
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


              <Controller
                  name='tags'
                  control={form.control}
                  render={({ field, fieldState }) => (
                  <Field className='mt-8'>
                      <FieldLabel htmlFor="slug">Tags</FieldLabel>
                     <Input
                      onChange={(e) => settagField(e.target.value)}
                      className='border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black'
                      type="text"
                      />
                      <div className="w-full relative">
                      <div className={`${tagField == '' ? 'hidden' : 'block'} w-full max-h-[400px] overscroll-y-auto p-0 bg-white z-100 absolute top-2 right-0 rounded-xs shadow-xs`}>
                        {tags?.filter((tag) => tag.name.includes(tagField) || tag.slug.includes(tagField)).map((tag) => (
                          <div className='w-full'>
                            <button type="button" onClick={() => {addTagToSelectedTags(tag.name); settagField('')}} className='w-full flex items-center justify-start p-3 hover:bg-gray-100 text-sm text-black/70 cursor-pointer'> 
                              <p>{tag.name}</p>
                            </button>
                          </div>
                        ))}
                      </div>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                  )}
              />
              
              <div className="w-full flex items-center flex-wrap gap-3 mt-2">
                {selectedTags.map((tag) => (
                  <div className='p-2.5 rounded-sm bg-white border-gray-100 border flex items-center gap-3'>
                    <p className='text-sm font-sans text-black/70'>{tag}</p>
                    <button type="button" onClick={() => {removeTagFromSelectedTags(tag)}} className='size-[20px] text-black/70'>
                      <X className='size-[18px] cursor-pointer text-black/70'/>
                    </button>
                  </div>
                ))}
              </div>

              <Controller
                  name='category'
                  control={form.control}
                  render={({ field, fieldState }) => (
                  <Field className='mt-8'>
                      <FieldLabel htmlFor="slug">Category</FieldLabel>
                      <Select
                      name={field.name}
                      value={String(field.value)}
                      onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full border-none border-gray-100/90 bg-gray-100/90 focus-visible:bg-white rounded-xs focus-visible:ring-[1px] focus-visible:ring-black">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className='z-300'>
                          {categories?.map((category) => (
                            <SelectItem value={String(category.id)}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                  )}
              />
              <div className="w-full py-5 px-8 border-t border-gray-100 sticky bottom-0 bg-white flex items-center justify-end mt-8 mb-0">
                <button type='submit' className='text-sm py-[5px] px-4.5 text-white bg-emerald-700/90 hover:bg-emerald-700 rounded-4xl transition-all duration-200 ease-in-out cursor-pointer'>
                {isSubmmitting ? 'Publishing...' : ' Publish'}
                </button>
              </div>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default WritePage