import Image from "next/image";

interface EmptyProps {
  label: string;
}

export function Empty({ label }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-20 ">
      <div className="relative h-72 w-72">
        <Image alt="Empty" src="/images/EMPTY.png" fill />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  );
}
