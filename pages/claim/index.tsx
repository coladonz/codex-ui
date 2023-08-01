"use client";

import Home from "@/components/home";
import ClaimPools from "./ClaimPools";

export default function Claim() {
  return (
    <Home>
      <div className="m-4">
        <div>
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="font-bold text-2xl">Claim</h1>
              <span className="text-gray-400">
                Claim your rewards
              </span>
            </div>
          </div>
        </div>
      </div>
      <ClaimPools />
    </Home>
  );
}
