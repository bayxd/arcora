// Global fetch interceptor. Setiap request yang menuju https://api.circle.com/*
// (baik dari kode kita sendiri maupun dari internal SDK @circle-fin/app-kit)
// di-rewrite jadi same-origin (/api/circle-proxy/*) SEBELUM sempat dikirim
// sebagai cross-origin request oleh browser. Karena rewrite terjadi sebelum
// fetch beneran jalan, tidak ada CORS preflight sama sekali — browser cuma
// lihat request ke origin sendiri.
//
// Ini yang bikin kit.estimateSwap()/kit.swap() dari SDK bisa dipanggil
// langsung dari client component tanpa kena error CORS yang kita alami
// sebelumnya (lihat: "blocked by CORS policy: Request header field
// x-user-agent is not allowed").
let installed = false;

export function installCircleProxy() {
  if (installed || typeof window === "undefined") {
    return;
  }

  installed = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => {
    try {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
          ? input.toString()
          : input.url;

      if (url.startsWith("https://api.circle.com/")) {
        const rewritten = url.replace(
          "https://api.circle.com",
          "/api/circle-proxy"
        );

        if (typeof input === "string") {
          return originalFetch(rewritten, init);
        }

        const request = new Request(rewritten, init);
        return originalFetch(request, init);
      }
    } catch (err) {
      console.error("Circle Proxy Error:", err);
    }

    return originalFetch(input, init);
  };
}