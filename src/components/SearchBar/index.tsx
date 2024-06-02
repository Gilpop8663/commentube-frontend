import React from "react";
import Logo from "../Logo";
import SearchGlass from "../icons/SearchGlass";

export default function SearchBar() {
  return (
    <div className="border border-[#c9c9c9] shadow-lg bg-white flex items-center p-4">
      <Logo />
      <div className="w-48">
        <SearchGlass />
      </div>
      <input
        className="text-3xl font-base w-full p-4"
        placeholder="의견을 나누고 싶은 동영상 주소를 입력하세요"
      />
    </div>
  );
}
