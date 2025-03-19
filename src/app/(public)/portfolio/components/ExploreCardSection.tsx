'use client'
import CustomSelect from "@/components/common/CustomSelect";
import TestimonialSection from "@/components/TestimonialSection";
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const cardTypes: string[] = ["Card Type", "Pokémon", "Spiderman", "Sports", "One Piece"];
const grades: string[] = ["Grade", "Grade 1", "Grade 2", "Grade 3", "Grade 4"];
const releaseYears: string[] = ["Year", "2020", "2021", "2022", "2023"]

const cards = [
  {
    type: "Sports",
    grade: "Grade 2",
    releaseYear: "2021",
    image: "/assets/images/patrick-homes.svg"
  },
  {
    type: "Sports",
    grade: "Grade 3",
    releaseYear: "2022",
    image: "/assets/images/mike-trout.svg"
  },
  {
    type: "One Piece",
    grade: "Grade 4",
    releaseYear: "2022",
    image: "/assets/images/manga_hq.svg"
  },
  {
    type: "Spiderman",
    grade: "Grade 1",
    releaseYear: "2023",
    image: "/assets/images/spiderman-hq.svg"
  }
]

export default function ExploreCardSection() {
  const [cardType, setCardType] = useState("Card Type");
  const [grade, setGrade] = useState("Grade");
  const [year, setYear] = useState("Year");
  const [searchTerm, setSearchTerm] = useState("");

  let filteredCards = cards.filter((card) => ((cardType == 'Card Type' || card.type == cardType) && (grade == 'Grade' || card.grade == grade ) && (year == 'Year' || card.releaseYear == year) ))
  filteredCards = filteredCards.filter(card => (Object.values(card)?.join(' ').toLowerCase().includes(searchTerm.toLocaleLowerCase())))

  return (
    <section className="p-10 mt-52">
      <h1 className="heading-primary font-bold text-charcol">Explore Graded Cards</h1>

      <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4 p-4 mt-10">
          {/* Search Bar */}
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-red-500 rounded-lg p-4 pl-10 outline-none focus:ring focus:ring-red-300"
            />
          </div>

          {/* dropdowns */}

          <CustomSelect options={cardTypes} selectedOption={cardType} setSelectedOption={setCardType} className="relative" />
          <CustomSelect options={grades} selectedOption={grade} setSelectedOption={setGrade} className="relative"/>
          <CustomSelect options={releaseYears} selectedOption={year} setSelectedOption={setYear} className="relative" />
        </div>
      </div>

      { filteredCards.length > 0 ?
      <div className="grid md:grid-cols-2 gap-20 mt-10">
        {filteredCards.map((card, i) => (
          <Image key={i} src={card.image} width={200} height={100} className="w-full px-10 mb-4" alt="card image" />
        ))}
      </div>
        :
        <p className="text-charcol text-center mt-10">No Cards Found</p>
      }

      <TestimonialSection />
    </section>
  )
}