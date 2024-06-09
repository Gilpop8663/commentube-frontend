import { FormEvent } from "react";
import Logo from "../Logo";
import SearchGlass from "../icons/SearchGlass";
import { UseFormInputResult } from "../../hooks/useInput";

interface SearchBarProps {
  handleSearchSubmit: (e: FormEvent) => void;
  search?: UseFormInputResult;
}

export default function SearchBar({
  handleSearchSubmit,
  search,
}: SearchBarProps) {
  return (
    <div className="border border-[#c9c9c9] shadow-lg bg-white flex items-center p-4 pb-6">
      <div className="mr-6">
        <Logo logoType="twoLine" />
      </div>
      <form className="flex w-full items-center" onSubmit={handleSearchSubmit}>
        <div className="mr-4">
          <button type="submit">
            <SearchGlass width={50} height={50} />
          </button>
        </div>
        <div className="relative w-full">
          <input
            {...search}
            className="text-3xl font-base w-full p-4"
            placeholder="의견을 나누고 싶은 동영상 주소를 입력하세요"
            type="text"
            required
          />
        </div>
      </form>
    </div>
  );
}
