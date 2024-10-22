/* eslint-disable @next/next/no-img-element */
"use client";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

export interface Logo {
  name: string;
  src: string;
  size: string;
}

export interface LogoListProps {
  logos: Logo[];
}

export function LogoList({ logos = [] }: LogoListProps) {
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo) => (
            <CardContainer key={logo.name}>
              <CardBody className="group/card relative h-auto w-auto max-w-96 rounded-xl border border-black/[0.2] bg-background p-4 dark:border-white/[0.2] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                <CardItem translateZ="100" className="relative aspect-square">
                  <img
                    src={logo.src}
                    alt={`Logo ${logo.name}`}
                    className="aspect-video h-full w-full object-contain"
                  />
                </CardItem>
                <div className="flex flex-col items-center justify-center gap-4 p-6">
                  <CardItem translateZ="20">
                    <h3 className="text-center font-semibold">{logo.name}</h3>
                    <p className="text-center text-sm">{logo.size}</p>
                  </CardItem>
                  <CardItem translateZ="40">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(logo.src, "_blank")}
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
