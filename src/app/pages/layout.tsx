import Nav from "@/app/components/common/NavBar/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div suppressHydrationWarning style={{
        background:
            "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
    }}>
      <Nav/>
      <div>{children}</div>
    </div>
  );
}