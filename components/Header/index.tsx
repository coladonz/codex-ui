import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center">
      <Link href="/#">
        <h3 className="text-3xl pr-8 border-solid border-r-2">Codex</h3>
      </Link>
      <Link href="/stake">
        <h3 className="text-md pl-8">Stake</h3>
      </Link>
      <Link href="/#">
        <h3 className="text-md pl-8">Claim</h3>
      </Link>
      <Link href="/#">
        <h3 className="text-md pl-8">Lock CDX</h3>
      </Link>
      <Link href="/#">
        <h3 className="text-md pl-8">More</h3>
      </Link>
    </div>
  );
}
