export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
        <span className="absolute inset-0 w-full h-full flex justify-center items-center text-blue-500 text-2xl font-semibold">
          <span className="loading loading-ring loading-lg"></span>
        </span>
      </div>
    </div>
  );
}
