"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Maczkó Web",
    desc: "A saját ügynökségi oldalam — Next.js, Aurora hero, Spline 3D, prémium animációk.",
    tag: "Ügynökség",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
    url: "https://maczkoweb.hu",
  },
  {
    title: "Maczkó Foto",
    desc: "Fotós portfólió galériával, lightbox-szal és SEO-val. Tiszta, gyors, prémium érzet.",
    tag: "Portfólió",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80",
    url: "https://maczkofoto.hu",
  },
  {
    title: "Multipro Group",
    desc: "Vállalati céloldal kontakt formmal, szolgáltatás-katalógussal és landing optimalizálással.",
    tag: "Vállalati",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    url: "https://multiprogroup.hu",
  },
];

export function Portfolio({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-neutral-400 mb-4">
            Munkáim
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-4">
            Pár friss projekt
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Mozgasd a kurzort a kártyák felett — interaktív 3D élmény, és katt az élő oldalra.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {list.map((p) => (
            <CardContainer key={p.title} className="inter-var">
              <CardBody className="bg-neutral-900/60 relative group/card hover:shadow-2xl hover:shadow-white/[0.05] border-white/[0.08] hover:border-white/[0.18] w-auto sm:w-[26rem] h-auto rounded-2xl p-6 border backdrop-blur-sm">
                <CardItem translateZ="40" className="text-xs uppercase tracking-wider text-neutral-400">
                  {p.tag}
                </CardItem>
                <CardItem translateZ="50" className="text-2xl font-display font-bold text-white mt-2">
                  {p.title}
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-400 text-sm max-w-sm mt-2">
                  {p.desc}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={p.img}
                    height={1000}
                    width={1000}
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={p.title}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-normal text-neutral-300 hover:text-white inline-flex items-center gap-1"
                  >
                    {p.url.replace(/^https?:\/\//, "")} <ArrowUpRight className="size-3" />
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
                  >
                    Megnyitás
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
