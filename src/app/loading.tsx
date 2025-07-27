// src/app/loading.tsx

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <span className="animate-pulse text-2xl font-medium text-gray-700">
        Loading…
      </span>
    </div>
  );
}
