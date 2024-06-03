import { FormEvent, Suspense } from "react";
import SearchBar from "../../components/SearchBar";
import PopularVideoFetcher from "../../fetchers/PopularVideoFetcher";
import { useFormInput } from "../../hooks/useInput";
import { useCreateVideo } from "../../hooks/mutation/useCreateVideo";

export default function HomePage() {
  const { handleCreateVideo, data, error } = useCreateVideo();
  const search = useFormInput();
  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleCreateVideo(search.value);
  };
  return (
    <div className="bg-brand h-screen p-16">
      <div className="mb-8">
        <SearchBar handleSearchSubmit={handleSearchSubmit} search={search} />
      </div>
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-4">
          <Suspense fallback={"로딩중"}>
            <PopularVideoFetcher />
          </Suspense>
        </div>
        <div className="bg-yellow-300 w-full col-span-6"></div>
      </div>
    </div>
  );
}
