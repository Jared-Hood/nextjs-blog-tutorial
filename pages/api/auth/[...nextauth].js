import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#0070f3", // Hex color code
    logo: "https://next-auth.js.org/img/logo/logo-xs.png", // Absolute URL to image
    buttonText: "#fff" // Hex color code
  }
})
