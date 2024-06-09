import { FormEvent, Suspense } from "react";
import SearchBar from "../../components/SearchBar";
import PopularVideoFetcher from "../../fetchers/PopularVideoFetcher";
import { useFormInput } from "../../hooks/useInput";
import { useCreateVideo } from "../../hooks/mutation/useCreateVideo";
import { validateSearch } from "../../validation/search";
import Poster from "../../assets/poster.png";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function HomePage() {
  const { handleCreateVideo } = useCreateVideo();
  const search = useFormInput({ validateFn: validateSearch });
  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isSearchValidate = search.validate();

    if (!isSearchValidate) return;

    handleCreateVideo(search.value);
  };
  return (
    <div className="bg-brand h-screen p-16 grid grid-rows-12">
      <div className="mb-8 row-span-2 h-full">
        <SearchBar handleSearchSubmit={handleSearchSubmit} search={search} />
      </div>
      <div className="grid grid-cols-10 gap-2 row-span-12 h-full">
        <div className="col-span-4 overflow-scroll">
          <ErrorBoundary fallback={<span>비디오를 불러오지 못했습니다.</span>}>
            <Suspense fallback={"로딩중"}>
              <PopularVideoFetcher />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="bg-[#3858ff] w-full col-span-6  h-full overflow-hidden">
          <img
            src={Poster}
            alt="포스터"
            className="object-contain h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
