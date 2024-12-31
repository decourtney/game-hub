'use client'

import Image from "next/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!email) {
      setMessage("Please provide an email address.");
      return;
    }

    try {
      const response = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Account with email ${email} was deleted successfully.`);
      } else {
        setMessage(`Error: ${data.error || "Could not delete the account."}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage("An error occurred while deleting the account.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center gap-4">
      <input
        type="email"
        placeholder="Enter email to delete"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-md p-2 mt-12"
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Delete Account
      </button>
      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  );
}
