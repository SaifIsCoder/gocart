export default function AuthCard({ title, children }) {
    return (
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          {title}
        </h1>
        {children}
      </div>
    );
  }
  