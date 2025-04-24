import React, { useState } from "react";
import "../styles/TestimonialCarousel.css";

const testimonials = [
  {
    text: "Explo-Math m'a permis de mieux comprendre les propriétés des nombres. Une expérience fascinante !",
    author: "Alice M.",
    role: "Étudiante en mathématiques",
    photo: "https://i.pravatar.cc/80?img=1",
  },
  {
    text: "Grâce à Explo-Math, j'ai découvert des applications pratiques des nombres que je n'aurais jamais imaginées.",
    author: "Jean P.",
    role: "Ingénieur",
    photo: "https://i.pravatar.cc/80?img=2",
  },
  {
    text: "Une plateforme incontournable pour tous ceux qui veulent explorer les mathématiques de manière ludique. J'y retourne souvent pour apprendre des choses nouvelles et étonnantes, c'est juste génial.",
    author: "Prof. Martin",
    role: "Université de Lyon",
    photo: "https://i.pravatar.cc/80?img=3",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonial-section">
      <h2 className="section-title">Ce que disent nos utilisateurs</h2>
      <div className="carousel-container">
        <button className="nav-button left" onClick={prevSlide}>
          &#8249;
        </button>

        <div className="testimonial-card fixed-height">
          <img
            src={testimonials[index].photo}
            alt={testimonials[index].author}
            className="testimonial-photo"
          />
          <p className="testimonial-text">"{testimonials[index].text}"</p>
          <p className="testimonial-author">{testimonials[index].author}</p>
          <p className="testimonial-role">{testimonials[index].role}</p>
        </div>

        <button className="nav-button right" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
    </section>
  );
}
