"use client";

import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";

const Loading = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const clerk = useClerk();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center space-y-4 w-full rounded-lg shadow-lg p-8 bg-white">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={user?.imageUrl}
              className="w-32 h-32 rounded-full"
              alt="profile"
            />
            <p className="text-2xl font-bold">{user?.fullName}</p>
            <p className="text-gray-500">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-gray-500">
              {user?.phoneNumbers[0]?.phoneNumber}
            </p>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => clerk.openUserProfile()}
            >
              ดูโปรไฟล์
            </button>
          </div>
        </div>
      </div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        <SignOutButton />
      </button>
    </main>
  );
}
