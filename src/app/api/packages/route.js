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
    return NextResponse.json(packages)
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

    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        items: data.items
      }
    })
    return NextResponse.json(pkg, { status: 201 })
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

    const pkg = await prisma.package.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        items: data.items
      }
    })
    return NextResponse.json(pkg)
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