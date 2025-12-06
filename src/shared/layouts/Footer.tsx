import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pm-card border-t border-pm-border py-4">
      <div className="container-pm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-sm text-pm-muted">
            <div className="w-2 h-2 bg-pm-success rounded-full animate-pm-pulse"></div>
            Secure • Reliable • Free Forever
          </div>

          <p className="text-sm text-pm-muted">
            © {currentYear} Profile Manager
          </p>

          <Link
            to="/privacy"
            className="text-sm text-pm-muted hover:text-pm-foreground transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
