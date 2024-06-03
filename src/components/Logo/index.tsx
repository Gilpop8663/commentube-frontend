interface LogoProps {
  logoType?: "oneLine" | "twoLine";
}

export default function Logo({ logoType = "oneLine" }: LogoProps) {
  return (
    <button className="font-monoton text-lg text-left whitespace-pre">{`SPACE${logoType === "twoLine" ? "\n" : " "}OPINION`}</button>
  );
}
