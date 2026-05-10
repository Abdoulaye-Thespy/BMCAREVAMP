// app/actions/chapter-actions.js
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Get all chapters
export async function getChapters() {
  try {
    const chapters = await prisma.chapter.findMany({
      orderBy: { name: 'asc' }
    })
    return { success: true, data: chapters }
  } catch (error) {
    console.error('Failed to fetch chapters:', error)
    return { success: false, error: 'Failed to fetch chapters' }
  }
}

// Create new chapter
export async function createChapter(formData) {
  try {
    const rawData = {
      name: formData.get('name'),
      description: formData.get('description') || null,
      phone: formData.get('phone') || null,
      email: formData.get('email') || null,
      address: formData.get('address') || null,
      members: formData.get('members') || null,
      website: formData.get('website') || null,
      president: formData.get('president') ? JSON.parse(formData.get('president')) : null,
    }

    const chapter = await prisma.chapter.create({
      data: rawData
    })
    
    revalidatePath('/admin/chapters')
    return { success: true, data: chapter }
  } catch (error) {
    console.error('Failed to create chapter:', error)
    if (error.code === 'P2002') {
      return { success: false, error: 'A chapter with this name already exists' }
    }
    return { success: false, error: 'Failed to create chapter' }
  }
}

// Update chapter
export async function updateChapter(id, formData) {
  try {
    const rawData = {
      name: formData.get('name'),
      description: formData.get('description') || null,
      phone: formData.get('phone') || null,
      email: formData.get('email') || null,
      address: formData.get('address') || null,
      members: formData.get('members') || null,
      website: formData.get('website') || null,
      president: formData.get('president') ? JSON.parse(formData.get('president')) : null,
    }

    const chapter = await prisma.chapter.update({
      where: { id: parseInt(id) },
      data: rawData
    })
    
    revalidatePath('/admin/chapters')
    return { success: true, data: chapter }
  } catch (error) {
    console.error('Failed to update chapter:', error)
    if (error.code === 'P2002') {
      return { success: false, error: 'A chapter with this name already exists' }
    }
    return { success: false, error: 'Failed to update chapter' }
  }
}

// Delete chapter
export async function deleteChapter(id) {
  try {
    await prisma.chapter.delete({
      where: { id: parseInt(id) }
    })
    
    revalidatePath('/admin/chapters')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete chapter:', error)
    return { success: false, error: 'Failed to delete chapter' }
  }
}

// Upload president photo
export async function uploadPresidentPhoto(formData) {
  'use server'
  
  try {
    const file = formData.get('file')
    
    if (!file) {
      return { success: false, error: 'No file uploaded' }
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create unique filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'chapter-presidents')
    const filePath = path.join(uploadDir, fileName)
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true })
    
    // Save file
    await writeFile(filePath, buffer)
    
    // Return the URL
    const url = `/uploads/chapter-presidents/${fileName}`
    
    return { success: true, url }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Upload failed' }
  }
}