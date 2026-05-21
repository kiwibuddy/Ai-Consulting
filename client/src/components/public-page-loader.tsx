/** Content-area loader for lazy public routes (header stays mounted via PublicRoute). */
export function PublicPageContentLoader() {
  return (
    <main
      className="relative min-h-[calc(100vh-76px)]"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="nb-public-route-progress" aria-hidden />
      <div className="flex flex-col items-center justify-center min-h-[min(60vh,calc(100vh-76px))] px-6 pt-10 pb-20">
        <div className="nb-public-loader-mark relative">
          <div className="nb-public-loader-glow" aria-hidden />
          <img
            src="/logo.png?v=2"
            alt=""
            className="relative z-[1] h-11 w-auto max-w-[200px] nb-logo-invert object-contain"
          />
        </div>
        <p className="nb-public-loader-label mt-8">Loading</p>
      </div>
    </main>
  );
}
