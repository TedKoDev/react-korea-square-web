import Quill from 'quill'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { categories } from '../../demoData/category'
import 'react-quill/dist/quill.bubble.css'
import Button from '../../components/button'
import { ImageResize } from 'quill-image-resize-module-ts'
import { useNewPost } from '../../hooks/usePostAPI'
import { getPresignedUrl } from './components/getPresignedUrl'
import { uploadFileToS3 } from './components/uploadFileToS3'
import FileUploadComponent from './components/fileUploadComponent'

Quill.register('modules/ImageResize', ImageResize)

const NewPost = () => {
  const [value, setValue] = useState('')
  const [charCount, setCharCount] = useState(0)
  const maxCharCount = 5000
  const { mutate: addPost } = useNewPost()

  const quillRef = useRef<ReactQuill | null>(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    console.log('Submitting data:', data)

    const editor = quillRef?.current?.getEditor()
    const delta = editor?.getContents()
    const imageDelta = delta?.ops?.filter((op) => op.insert?.image)
    const imageUrls = imageDelta?.map((op) => op.insert?.image)
    console.log('imageUrls:', imageUrls)

    let uploadedUrls = [] as String[]
    if (imageUrls && imageUrls.length > 0) {
      const fileUploads = imageUrls.map(async (imageUrl) => {
        console.log('Uploading image:', imageUrl)
        const response = await fetch(imageUrl)
        console.log('Response for image URL:', response)
        const blob = await response.blob()
        const file = new File([blob], `file.${blob.type.split('/')[1]}`, {
          type: blob.type,
        })
        return await uploadFileToS3(file)
      })

      uploadedUrls = await Promise.all(fileUploads)
      console.log('Uploaded URLs:', uploadedUrls)
    }

    // Blob URL을 S3 URL로 대체
    let content = editor?.root.innerHTML
    if (uploadedUrls.length > 0) {
      imageUrls?.forEach((blobUrl, index) => {
        const s3Url = uploadedUrls[index] as any
        content = content?.replace(blobUrl, s3Url)
      })
    }

    // 파일 업로드 처리
    const fileInput = fileInputRef.current as any
    let fileUrls = [] as any
    if (fileInput.files.length > 0) {
      const fileUploads = Array.from(fileInput.files).map(async (file) => {
        console.log('Uploading file:', file)
        return await uploadFileToS3(file)
      })

      fileUrls = await Promise.all(fileUploads)
      console.log('Uploaded file URLs:', fileUrls)
    }

    const postData = {
      ...data,
      content: content,
      files: fileUrls,
    }

    console.log('Creating post:', postData)
    addPost(postData, {
      onSuccess: () => {
        toast.success('게시물이 성공적으로 작성되었습니다.')
        reset()
        navigate('/boards')
      },
      onError: (error) => {
        toast.error('게시물 작성에 실패했습니다.')
        console.error('Failed to create post:', error)
      },
    })
  }

  useEffect(() => {
    register('content', { required: true })
  }, [register])

  useEffect(() => {
    setFormValue('content', value)
  }, [value, setFormValue])

  const Image = Quill.import('formats/image')
  Image.sanitize = function (url: string) {
    return url
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', () => {
      const file = input.files ? input.files[0] : null
      if (file) {
        const blobURL = URL.createObjectURL(file)
        const editor = quillRef?.current?.getEditor()
        const range = editor?.getSelection()
        if (range) {
          editor?.insertEmbed(range.index, 'image', blobURL)
          editor?.setSelection((range.index + 1) as any)
        }
      }
    })
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          [{ color: [] }, { background: [] }],
          ['image'],
          [{ align: [] }],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    []
  )

  const handleTextChange = (content: any) => {
    setCharCount(content.length)
    if (content.length <= maxCharCount) {
      setValue(content)
    }
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex flex-col w-full">
        <h3 className="text-3xl font-bold">글쓰기</h3>
        <form
          className="flex flex-col gap-2 my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-semibold  my-2">카테고리</h2>
          <select
            {...register('category', { required: true })}
            className="border border-gray-500 rounded-md p-2"
          >
            <option value="">카테고리를 선택해주세요</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500">카테고리를 선택해주세요.</span>
          )}

          <h1 className="font-semibold ">제목</h1>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            {...register('title', { required: true })}
            className="border border-gray-500 rounded-md p-2"
          />
          {errors.title && (
            <span className="text-red-500">제목을 입력해주세요.</span>
          )}

          <div className="">
            <ReactQuill
              theme="snow"
              value={value}
              className=" rounded-md  h-96 "
              onChange={handleTextChange}
              ref={quillRef}
              modules={modules}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'align',
                'image',
                'color',
                'background',
              ]}
            />
            {errors.content && (
              <span className="text-red-500">본문 내용을 입력해주세요.</span>
            )}
          </div>
          {/* 글자 개수 표시에 mt-2 적용 */}
          <div>
            <div className="text-right mt-16">
              {charCount}/{maxCharCount} 글자
            </div>
          </div>

          {/* 파일 첨부 섹션에 mt-4 적용 */}
          <FileUploadComponent />
          <Button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-lg"
          >
            저장
          </Button>
        </form>
      </div>
    </div>
  )
}

export default NewPost
