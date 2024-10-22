import { type Color, ColorList } from "./ColorList";
import { ColorProvider } from "./ColorProvider";
import { SelectMode } from "./SelectMode";

const colors: Color[] = [
  {
    name: "Primary",
    hex: "#00D8FF",
  },
  {
    name: "Secondary",
    hex: "#FFE713",
  },
  {
    name: "Muted",
    hex: "#1CA0FB",
  },
  {
    name: "Accent",
    hex: "#FF4154",
  },
];

export function ColorSection() {
  return (
    <section className="mb-12 flex flex-col items-center gap-12">
      <h2 className="text-4xl font-semibold">Colores</h2>

      <ColorProvider>
        <SelectMode />

        <ColorList colors={colors} />
      </ColorProvider>
    </section>
  );
}
