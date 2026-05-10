import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("=================================")
        console.log("🔐 Login attempt started")
        console.log("Email received:", credentials?.email)
        console.log("Password received:", credentials?.password ? "Yes (length: " + credentials.password.length + ")" : "No")
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password")
          return null
        }

        console.log("📡 Looking up user in database...")
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          console.log("❌ User NOT found:", credentials.email)
          console.log("=================================")
          return null
        }

        console.log("✅ User found:", user.email)
        console.log("User role:", user.role)
        console.log("Has password in DB:", user.password ? "Yes" : "No")
        console.log("Stored password hash length:", user.password?.length)
        
        if (!user.password) {
          console.log("❌ User has no password set in database")
          console.log("=================================")
          return null
        }

        console.log("🔑 Comparing passwords...")
        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        console.log("Password match result:", passwordMatch)

        if (!passwordMatch) {
          console.log("❌ Password does NOT match")
          console.log("=================================")
          return null
        }

        console.log("✅✅✅ LOGIN SUCCESSFUL! ✅✅✅")
        console.log("=================================")
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions