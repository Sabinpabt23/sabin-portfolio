export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--border) py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
        <p className="text-xs text-muted-foreground">
          © {year} Sabin Pant
        </p>
        <p className="text-xs text-muted-foreground">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
