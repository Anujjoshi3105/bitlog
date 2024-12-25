import HeroSearch from "@/sections/Home/HeroSearch";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl text-center min-h-[50vh]">
      <div className="select-none w-full">
        <h3 className="mb-4 font-inter text-sm font-semibold">
          Explore tech tutorials and insights
        </h3>
        <h1 className="mb-5 mx-auto max-w-2xl text-4xl font-bold md:text-5xl">
          The Future of Learning
        </h1>
        <h2 className="mx-auto mb-8 max-w-md leading-6 font-medium text-primary/80">
          Unlock smarter, faster content creation and elevate your tech
          expertise seamlessly
        </h2>
      </div>
      <HeroSearch />
    </section>
  );
}
