export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">AI Journal</h1>
        <p className="text-2xl text-white/60 mb-4">
          The best app for tracking your mood through life. All we ask is that
          you be honest
        </p>
        <div>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
