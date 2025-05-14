import Image from "next/image";

export function Loader() {
  return (
    <div className="flex flex-col items-center h-full gap-y-4">
      <div className="w-10 h-10 relative animate-spin ">
        <Image
          alt="logo"
          src={"/images/LOGO.jpg"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full"
        />
      </div>
      <p className="text-sm text-muted-foreground">Genius is thinking</p>
    </div>
  );
}
