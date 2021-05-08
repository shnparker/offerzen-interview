import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ErrorLayout({ children }: Props): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {children}
      </div>
    </div>
  );
}
