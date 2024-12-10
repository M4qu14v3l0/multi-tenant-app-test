import React from "react";

type Params = {
  params: Promise<{ subdomain: string }>;
};

export default async function DomainShop({ params }: Params) {
  const tenant = (await params).subdomain;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-4 text-black">
        {tenant ? `Welcome to ${tenant}` : "Welcome"}
      </h1>
    </div>
  );
}
