export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--border) py-8">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-xs text-muted-foreground">© {year} Sabin Pant</p>
      </div>
    </footer>
  );
}
