import Logo from "../Logo";

export default function Header() {
  return (
    <div className="fixed top-0 bg-brand w-full left-0">
      <div className="p-5">
        <Logo />
      </div>
    </div>
  );
}
