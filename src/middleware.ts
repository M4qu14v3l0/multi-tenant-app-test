import { NextResponse } from "next/server";
import subdomains from "../subdomains.json";

export default async function middleware(req: Request) {
  console.log("Middleware is running!");
  console.log(`Requested URL: ${req.url}`);

  const url = new URL(req.url);
  const hostname = req.headers.get("host") || "";

  // Define list of allowed domains
  // (including localhost and your deployed domain)
  const allowedDomains = [
    "localhost:3000",
    "m4qu14v3l0.com.com",
    "m4qu14v3l0.com",
  ];

  // Check if the current hostname is in the list of allowed domains
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname.includes(domain)
  );

  // Extract the potential subdomain from the URL
  const subdomain = hostname.split(".")[0];

  // If user is on an allowed domain and it's not a subdomain, allow the request
  if (isAllowedDomain && !subdomains.some((d) => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find((d) => d.subdomain === subdomain);

  if (subdomainData) {
    // Rewrite the URL to a dynamic path based on the subdomain
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}`, req.url)
    );
  }

  return new Response(null, { status: 404 });
}
