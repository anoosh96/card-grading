import Faqs from "@/components/Faqs";

const FAQS = [
  {
    question: "What is AI grading, and how does it work?",
    answer: `Lorem ipsum dolor sit amet consectetur. Ut mus ut amet sed enim non. Laoreet nulla libero venenatis volutpat malesuada donec at.
             Netus placerat libero sagittis tincidunt arcu commodo sed mauris mauris. Egestas arcu adipiscing sagittis sollicitudin pellentesque.
             Sed faucibus feugiat nulla vitae est aliquet amet nisl. Quis in turpis sed tellus tortor proin eget cras. Facilisis eget eget neque ut ultrices ac non at.
             Amet pellentesque purus viverra sit aliquam euismod pulvinar tellus. Commodo at aliquam molestie adipiscing porta donec. Est vulputate etiam elit mauris pretium sed euismod egestas.
             Pharetra posuere nisi neque.`
  },
  {
    question: "How long does the grading process take?",
    answer: `Lorem ipsum dolor sit amet consectetur. Ut mus ut amet sed enim non. Laoreet nulla libero venenatis volutpat malesuada donec at.
             Netus placerat libero sagittis tincidunt arcu commodo sed mauris mauris. Egestas arcu adipiscing sagittis sollicitudin pellentesque.
             Sed faucibus feugiat nulla vitae est aliquet amet nisl. Quis in turpis sed tellus tortor proin eget cras. Facilisis eget eget neque ut ultrices ac non at.
             Amet pellentesque purus viverra sit aliquam euismod pulvinar tellus. Commodo at aliquam molestie adipiscing porta donec. Est vulputate etiam elit mauris pretium sed euismod egestas.
             Pharetra posuere nisi neque.`
  },
  {
    question: "How do I package my cards for submission?",
    answer: `Lorem ipsum dolor sit amet consectetur. Ut mus ut amet sed enim non. Laoreet nulla libero venenatis volutpat malesuada donec at.
             Netus placerat libero sagittis tincidunt arcu commodo sed mauris mauris. Egestas arcu adipiscing sagittis sollicitudin pellentesque.
             Sed faucibus feugiat nulla vitae est aliquet amet nisl. Quis in turpis sed tellus tortor proin eget cras. Facilisis eget eget neque ut ultrices ac non at.
             Amet pellentesque purus viverra sit aliquam euismod pulvinar tellus. Commodo at aliquam molestie adipiscing porta donec. Est vulputate etiam elit mauris pretium sed euismod egestas.
             Pharetra posuere nisi neque.`
  },
  {
    question: "What happens if my card is lost in transit?",
    answer: `Lorem ipsum dolor sit amet consectetur. Ut mus ut amet sed enim non. Laoreet nulla libero venenatis volutpat malesuada donec at.
             Netus placerat libero sagittis tincidunt arcu commodo sed mauris mauris. Egestas arcu adipiscing sagittis sollicitudin pellentesque.
             Sed faucibus feugiat nulla vitae est aliquet amet nisl. Quis in turpis sed tellus tortor proin eget cras. Facilisis eget eget neque ut ultrices ac non at.
             Amet pellentesque purus viverra sit aliquam euismod pulvinar tellus. Commodo at aliquam molestie adipiscing porta donec. Est vulputate etiam elit mauris pretium sed euismod egestas.
             Pharetra posuere nisi neque.`
  },
  {
    question: "Can I submit non-Pokémon cards for grading?",
    answer: `Lorem ipsum dolor sit amet consectetur. Ut mus ut amet sed enim non. Laoreet nulla libero venenatis volutpat malesuada donec at.
             Netus placerat libero sagittis tincidunt arcu commodo sed mauris mauris. Egestas arcu adipiscing sagittis sollicitudin pellentesque.
             Sed faucibus feugiat nulla vitae est aliquet amet nisl. Quis in turpis sed tellus tortor proin eget cras. Facilisis eget eget neque ut ultrices ac non at.
             Amet pellentesque purus viverra sit aliquam euismod pulvinar tellus. Commodo at aliquam molestie adipiscing porta donec. Est vulputate etiam elit mauris pretium sed euismod egestas.
             Pharetra posuere nisi neque.`
  }
]

export default function GradingFaqSection() {
  return(
    <section className="mt-14 p-10">
      <h2 className="heading-primary font-bold">FAQ&#39;s</h2>
      <p className="mt-2">Answers to Your Most Common Questions</p>

      <Faqs faqs={FAQS} />
    </section>
  )
}