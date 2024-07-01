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

Quill.register('modules/ImageResize', ImageResize)

const NewPost = () => {
  const [value, setValue] = useState('')
  const [charCount, setCharCount] = useState(0)
  const maxCharCount = 5000
  const { mutate: addPost } = useNewPost()

  const quillRef = useRef<ReactQuill | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log('Submitting data:', data)

    addPost(
      { ...data },
      {
        onSuccess: () => {
          toast.success('공지 사항 추가되었습니다.')
          reset()
          setValue('')
          navigate('/boards')
        },
        onError: (error) => {
          console.error('Error creating post:', error)
          toast.error('공지 사항 추가에 실패했습니다.')
        },
      }
    )
  }

  useEffect(() => {
    register('content', { required: true })
  }, [register])

  useEffect(() => {
    setFormValue('content', value)
  }, [value, setFormValue])

  const Image = Quill.import('formats/image')
  Image.sanitize = function (url) {
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
          editor?.setSelection(range.index + 1)
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

  const handleTextChange = (content) => {
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
          <h2 className="font-semibold text-center my-2">카테고리</h2>
          <select
            {...register('category', { required: true })}
            className="border rounded p-2"
          >
            <option value="">카테고리를 선택해주세요</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <h1 className="font-semibold text-center">제목</h1>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            {...register('title', { required: true })}
            className="border rounded p-2"
          />
          {errors.title && (
            <span className="text-red-500">제목을 입력해주세요.</span>
          )}

          {errors.category && (
            <span className="text-red-500">카테고리를 선택해주세요.</span>
          )}

          <ReactQuill
            theme="snow"
            value={value}
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
            style={{ height: '400px' }}
          />
          {errors.content && (
            <span className="text-red-500">본문 내용을 입력해주세요.</span>
          )}
          <div className="text-right mt-2">
            {charCount}/{maxCharCount} 글자
          </div>
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
