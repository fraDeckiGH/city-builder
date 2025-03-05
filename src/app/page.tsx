// import Image from "next/image";
import CityBuilder from "@/components/CityBuilder";

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8 h-screen
        flex flex-col">
        <h1 className="text-4xl font-bold mb-8">
          Scaleflex tech assignment
        </h1>
        <CityBuilder />
      </div>
    </main>
  );
}
