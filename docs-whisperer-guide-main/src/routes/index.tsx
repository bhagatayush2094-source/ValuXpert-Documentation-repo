import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Copy, LogOut, Menu, Search, X } from "lucide-react";

import { sections } from "@/lib/docs-content";
import { signOut } from "@/components/auth-gate";
import logoIconUrl from "../../public/logo-icon.png?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valuxpert Documentation — Manage your company and staff" },
      {
        name: "description",
        content:
          "Official Valuxpert documentation: getting started, company setup, staff management, roles, billing, troubleshooting, and FAQ.",
      },
      { property: "og:title", content: "Valuxpert Documentation" },
      {
        property: "og:description",
        content:
          "Everything you need to set up your company workspace, invite staff, and manage roles in Valuxpert.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DocsPage,
});

function CopyPageButton({ sectionId }: { sectionId: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* noop */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy page"}
    </button>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) visible.set(id, e.intersectionRatio);
            else visible.delete(id);
          }
          if (visible.size) {
            const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
            setActive(top);
          }
        },
        { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

function DocsPage() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sectionIds = useMemo(() => sections.map((s) => s.id), []);
  const active = useActiveSection(sectionIds);

  const q = query.trim().toLowerCase();
  const matches = (text: string) => !q || text.toLowerCase().includes(q);

  const filteredSections = sections.map((s) => {
    const sectionMatch = matches(s.title);
    const subMatches = s.subsections.filter((sub) => matches(sub.title));
    return { section: s, sectionMatch, subMatches, anyMatch: sectionMatch || subMatches.length > 0 };
  });

  const activeSection = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <a href="#introduction" className="flex items-center gap-2.5">
            <img
              src={logoIconUrl}
              alt="Valuxpert"
              className="h-7 w-auto"
              loading="eager"
            />
            <span className="text-[15px] font-semibold tracking-tight text-ink">Valuxpert</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:inline">
              Docs
            </span>
          </a>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Search"
            >
              <Search className="size-4" />
            </button>
            <button
              onClick={() => signOut()}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border px-4 py-2 sm:px-6">
            <div className="relative mx-auto max-w-2xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter sections…"
                className="h-10 w-full rounded-md border border-border bg-panel pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="border-t border-border bg-background/60">
          <div className="flex h-10 items-center gap-2 px-4 text-xs text-muted-foreground sm:px-6">
            <a href="#introduction" className="hover:text-foreground">
              Documentation
            </a>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="font-medium text-primary">{activeSection.title}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-24 left-0 z-30 w-72 overflow-y-auto border-r border-border bg-background px-4 py-6 transition-transform lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Documentation
          </p>
          <nav className="space-y-1">
            {filteredSections.map(({ section, anyMatch, subMatches, sectionMatch }) => {
              const isActive = active === section.id;
              if (!anyMatch && q) return null;
              return (
                <div key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/75 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`grid size-5 place-items-center rounded text-[10px] font-semibold ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {section.number}
                    </span>
                    {section.title}
                  </a>
                  {isActive && !q && section.subsections.length > 0 && (
                    <div className="ml-8 mt-1 space-y-0.5 border-l border-border pl-3">
                      {section.subsections.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          onClick={() => setSidebarOpen(false)}
                          className="block rounded px-2 py-1 text-xs text-muted-foreground hover:text-primary"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                  {q && !sectionMatch && subMatches.length > 0 && (
                    <div className="ml-8 mt-1 space-y-0.5 border-l border-border pl-3">
                      {subMatches.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          onClick={() => setSidebarOpen(false)}
                          className="block rounded px-2 py-1 text-xs text-muted-foreground hover:text-primary"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {q && filteredSections.every((f) => !f.anyMatch) && (
              <p className="px-3 py-2 text-sm text-muted-foreground">No matches for “{query}”.</p>
            )}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 top-24 z-20 bg-foreground/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Valuxpert Documentation
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Manage your company and staff, all in one place.
              </h1>
              <p className="mt-4 text-lg leading-7 text-muted-foreground">
                Everything you need to set up your workspace, invite your team, and run Valuxpert
                with confidence.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-border bg-panel px-2.5 py-1">
                  Version 1.0
                </span>
                <span className="rounded-full border border-border bg-panel px-2.5 py-1">
                  Web-based
                </span>
                <span className="rounded-full border border-border bg-panel px-2.5 py-1">
                  Admins & Staff
                </span>
              </div>
            </div>

            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-border pt-14 first:border-0 first:pt-0"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Section {String(s.number).padStart(2, "0")} — {s.title}
                  </span>
                  <CopyPageButton sectionId={s.id} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-[2rem]">
                  {s.title}
                </h2>
                <div className="mt-3 text-[17px] leading-8">{s.content}</div>
              </section>
            ))}

            <footer className="mt-20 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>
                Need more help? Email{" "}
                <a
                  href="mailto:support@valuxpert.com"
                  className="font-medium text-primary hover:underline"
                >
                  support@valuxpert.com
                </a>
                .
              </p>
              <p className="mt-2">© {new Date().getFullYear()} Valuxpert. All rights reserved.</p>
            </footer>
          </div>
        </main>

        {/* TOC */}
        <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto px-6 py-10 xl:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            On this page
          </p>
          <ul className="space-y-1.5 border-l border-border">
            {activeSection.subsections.map((sub) => (
              <li key={sub.id}>
                <a
                  href={`#${sub.id}`}
                  className="-ml-px block border-l border-transparent pl-3 text-sm text-muted-foreground hover:border-primary hover:text-primary"
                >
                  {sub.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
