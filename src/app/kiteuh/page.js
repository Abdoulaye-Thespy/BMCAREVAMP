"use client"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import KiteuhForm from "@/components/sections/kiteuh-form"

export default function KiteuhPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <KiteuhForm />
      </main>
      <Footer />
    </>
  )
}
