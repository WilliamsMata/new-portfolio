import { type Color, ColorList } from "./ColorList";
import { ColorProvider } from "./ColorProvider";
import { SelectMode } from "./SelectMode";

const colors: Color[] = [
  {
    name: "Blue",
    hex: "#2563EB",
  },
  {
    name: "Purple",
    hex: "#9333EA",
  },
  {
    name: "Cyan",
    hex: "#22d3EE",
  },
  {
    name: "Yellow",
    hex: "#FFE713",
  },
  {
    name: "light-blue",
    hex: "#DBEAFE",
  },
  {
    name: "Dark",
    hex: "#09090B",
  },
  {
    name: "Gray",
    hex: "#171717",
  },
  {
    name: "White",
    hex: "#FFFFFF",
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
