// app/api/packages/route.js

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/packages - Fetch all packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    })
    
    // Parse items back to array for frontend
    const packagesWithItems = packages.map(pkg => ({
      ...pkg,
      items: pkg.items ? pkg.items.split(',').map(item => item.trim()) : []
    }))
    
    return NextResponse.json(packagesWithItems)
  } catch (error) {
    console.error('Failed to fetch packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' }, 
      { status: 500 }
    )
  }
}

// POST /api/packages - Create a new package
export async function POST(request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.price || !data.category || !data.items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert items array to string if it's an array
    let itemsString = data.items
    if (Array.isArray(data.items)) {
      itemsString = data.items.join(', ')
    }

    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        items: itemsString // Store as string
      }
    })
    
    // Return with items as array for consistency
    return NextResponse.json({
      ...pkg,
      items: pkg.items.split(',').map(item => item.trim())
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to create package:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}

// PUT /api/packages - Update an existing package
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    // Convert items array to string if it's an array
    let itemsString = data.items
    if (Array.isArray(data.items)) {
      itemsString = data.items.join(', ')
    }

    const pkg = await prisma.package.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        items: itemsString
      }
    })
    
    return NextResponse.json({
      ...pkg,
      items: pkg.items.split(',').map(item => item.trim())
    })
  } catch (error) {
    console.error('Failed to update package:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
      { status: 500 }
    )
  }
}

// DELETE /api/packages - Delete a package
export async function DELETE(request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    await prisma.package.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete package:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}