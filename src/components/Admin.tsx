import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type User = {
  apiKey: string;
  credits: number;
  paid: boolean;
};

export default function Admin() {
  const [apiKey, setApiKey] = useState<string>();
  const [credits, setCredits] = useState<number>();
  const [paid, setPaid] = useState<boolean>();
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((user: User) => {
        setApiKey(user.apiKey);
        setCredits(user.credits);
        setPaid(user.paid);
      });
  }, [session]);

  const handleResetApiKey = () => {
    setApiKey("please wait...");
    fetch("/api/auth/newKey")
      .then((res) => res.json())
      .then((json) => json.data)
      .then((apiKey) => setApiKey(apiKey));
  };

  return (
    <div className="h-[85vh]">
      <div className="overflow-hidden bg-white py-16 px-6 lg:px-8 lg:py-24 ">
        <div className="relative mx-auto max-w-xl">
          <svg className="absolute left-full translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg className="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin</h2>
          </div>
          <div className="mt-12">
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Secret API Key:</label>{" "}
                <div className="m-6">
                  <code className="block text-lg font-medium text-gray-700">{apiKey}</code>
                  {apiKey ? (
                    <button onClick={() => handleResetApiKey()} type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
                      Reset API Key
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Credits Used:</label>
                <div className="mt-1">
                  <div className="m-6">
                    <code className="block text-lg font-medium text-gray-700">{credits}</code>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Paid:</label>
                <div className="mt-1">
                  <div className="m-6">
                    <code className="block text-lg font-medium text-gray-700">{paid.toString()}</code>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
