import Image from "next/image";

function GradedCardsSection() {
  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto">
        <div className="flex flex-col items-start w-full gap-10">
          <h2 className="text-[2rem] font-bold">Graded Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-14">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <Image
                    src={`/assets/images/graded-section-card-${index === 3 ? 1 : index}.svg`}
                    alt={`Graded Card ${index}`}
                    width={350}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GradedCardsSection;
