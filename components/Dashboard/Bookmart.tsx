import { Bookmark } from "lucide-react";

export function BookmarkComponent() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-100">
      <Bookmark /> Show Bookmarks
    </button>
  );
}
