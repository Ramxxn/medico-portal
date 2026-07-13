import React, { useMemo, useState } from 'react'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi'

const initialBlogs = [
  {
    id: 1,
    title: 'How to build a calm daily routine',
    slug: 'how-to-build-a-calm-daily-routine',
    status: 'Published',
    category: 'Wellness',
    author: 'Dr. Meera Sharma',
    publishAt: '2026-07-15T10:00',
    excerpt: 'A simple framework for establishing steadier routines that support long-term wellbeing.',
    content: '<p>Use this guide to create a morning and evening rhythm that feels sustainable and restorative.</p>',
    image: ''
  }
]

const BlogManager = () => {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [form, setForm] = useState({
    id: '', title: '', slug: '', status: 'Draft', category: '', author: '', publishAt: '', excerpt: '', content: '', image: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const resetForm = () => {
    setForm({ id: '', title: '', slug: '', status: 'Draft', category: '', author: '', publishAt: '', excerpt: '', content: '', image: '' })
    setEditingId(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title || !form.slug || !form.category || !form.author || !form.excerpt) return

    const entry = {
      ...form,
      id: editingId || Date.now(),
      image: form.image || ''
    }

    if (editingId) {
      setBlogs((prev) => prev.map((blog) => blog.id === editingId ? entry : blog))
    } else {
      setBlogs((prev) => [entry, ...prev])
    }
    resetForm()
  }

  const handleEdit = (blog) => {
    setEditingId(blog.id)
    setForm({ ...blog })
  }

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id))
  }

  const handleStatusToggle = (id) => {
    setBlogs((prev) => prev.map((blog) => blog.id === id ? { ...blog, status: blog.status === 'Published' ? 'Draft' : 'Published' } : blog))
  }

  const slugPreview = useMemo(() => {
    return form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }, [form.title])

  return (
    <div className='flex-1 bg-[#f7f8fc] min-h-screen p-4 md:p-6'>
      <div className='rounded border border-border bg-white p-4 md:p-6 shadow-sm'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>Blog management</p>
            <h1 className='text-2xl font-semibold text-tx-1'>Create, schedule, and manage editorial content</h1>
            <p className='mt-2 text-sm text-tx-3'>Publish, draft, preview, and keep your blog library organized from one place.</p>
          </div>
          <button onClick={() => setPreviewOpen(true)} className='btn-outline'>Preview selected</button>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
          <div className='space-y-4 rounded border border-border p-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <label className='text-sm'>
                <span className='mb-1 block text-tx-3'>Title</span>
                <input className='input' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugPreview })} required />
              </label>
              <label className='text-sm'>
                <span className='mb-1 block text-tx-3'>Slug</span>
                <input className='input' value={form.slug || slugPreview} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              </label>
            </div>

            <label className='text-sm'>
              <span className='mb-1 block text-tx-3'>Featured image</span>
              <input type='file' className='input' onChange={(e) => setForm({ ...form, image: e.target.files?.[0]?.name || '' })} />
            </label>

            <label className='text-sm'>
              <span className='mb-1 block text-tx-3'>Short description</span>
              <textarea className='input min-h-[90px]' value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
            </label>

            <label className='text-sm'>
              <span className='mb-1 block text-tx-3'>Full content</span>
              <textarea className='input min-h-[150px]' value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder='Rich content can be pasted here.' />
            </label>
          </div>

          <div className='space-y-4 rounded border border-border p-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <label className='text-sm'>
                <span className='mb-1 block text-tx-3'>Author</span>
                <input className='input' value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
              </label>
              <label className='text-sm'>
                <span className='mb-1 block text-tx-3'>Category</span>
                <input className='input' value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </label>
            </div>
            <label className='text-sm'>
              <span className='mb-1 block text-tx-3'>Status</span>
              <select className='input' value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value='Draft'>Draft</option>
                <option value='Published'>Published</option>
                <option value='Scheduled'>Scheduled</option>
              </select>
            </label>
            <label className='text-sm'>
              <span className='mb-1 block text-tx-3'>Publish date & time</span>
              <input type='datetime-local' className='input' value={form.publishAt} onChange={(e) => setForm({ ...form, publishAt: e.target.value })} />
            </label>
            <div className='flex flex-wrap gap-3'>
              <button type='submit' className='btn-primary'><HiOutlinePlus className='w-4 h-4' /> {editingId ? 'Save changes' : 'Create blog'}</button>
              <button type='button' onClick={resetForm} className='btn-outline'>Reset</button>
            </div>
          </div>
        </form>

        <div className='mt-8 space-y-3'>
          {blogs.map((blog) => (
            <div key={blog.id} className='flex flex-col md:flex-row md:items-center md:justify-between rounded border border-border bg-surface-2 p-4 gap-3'>
              <div>
                <div className='flex flex-wrap items-center gap-2'>
                  <h2 className='font-semibold text-tx-1'>{blog.title}</h2>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${blog.status === 'Published' ? 'bg-success-bg text-success' : blog.status === 'Scheduled' ? 'bg-info-bg text-info' : 'bg-surface-3 text-tx-3'}`}>{blog.status}</span>
                </div>
                <p className='mt-1 text-sm text-tx-3'>{blog.excerpt}</p>
                <div className='mt-2 flex flex-wrap items-center gap-4 text-xs text-tx-3'>
                  <span className='flex items-center gap-1'><HiOutlineCalendar className='w-4 h-4' /> {blog.publishAt || 'No scheduled publish date'}</span>
                  <span>{blog.category}</span>
                  <span>{blog.author}</span>
                </div>
              </div>
              <div className='flex flex-wrap gap-2'>
                <button onClick={() => handleStatusToggle(blog.id)} className='btn-ghost'>{blog.status === 'Published' ? <><HiOutlineXCircle className='w-4 h-4' /> Unpublish</> : <><HiOutlineCheckCircle className='w-4 h-4' /> Publish</>}</button>
                <button onClick={() => handleEdit(blog)} className='btn-outline'><HiOutlinePencil className='w-4 h-4' /> Edit</button>
                <button onClick={() => handleDelete(blog.id)} className='btn-danger'><HiOutlineTrash className='w-4 h-4' /> Delete</button>
                <button onClick={() => { setForm(blog); setPreviewOpen(true) }} className='btn-ghost'><HiOutlineEye className='w-4 h-4' /> Preview</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {previewOpen && (
        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-2xl rounded border border-border bg-white p-6 shadow-xl'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-semibold text-tx-1'>Preview</h3>
              <button onClick={() => setPreviewOpen(false)} className='btn-ghost'>Close</button>
            </div>
            <div className='mt-5 rounded border border-border bg-surface-2 p-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>{form.category || 'Category'}</p>
              <h4 className='mt-2 text-2xl font-semibold text-tx-1'>{form.title || 'Blog title'}</h4>
              <p className='mt-3 text-sm text-tx-2'>{form.excerpt || 'Your short description will appear here.'}</p>
              <div className='mt-4 whitespace-pre-line text-sm text-tx-3'>{form.content || 'Your full content will appear here.'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogManager
