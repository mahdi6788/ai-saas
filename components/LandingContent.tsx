"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Sophie",
    avatar: "S",
    title: "Designer",
    description: "Absolutely love how intuitive this app is!",
  },
  {
    name: "Carlos",
    avatar: "C",
    title: "Entrepreneur",
    description: "A game-changer for my business workflow!",
  },
  {
    name: "Mahdi",
    avatar: "M",
    title: "Developer",
    description: "This is the best application I've used!",
  },
  {
    name: "Aisha",
    avatar: "A",
    title: "Marketer",
    description: "This tool made my campaigns so much easier!",
  },
];
export default function LandingContent() {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-[#192339] border-none text-white ">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
