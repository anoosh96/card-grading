import StepCard from "./StepCard"

const STEPS = [
  {
    image: '/assets/images/step-1.svg',
    title: 'Submission Form',
    desc: 'Provide details of the cards you want graded in our simple online form.'
  },
  {
    image: '/assets/images/step-2.svg',
    title: 'Post Cards',
    desc: 'Securely package and send your cards to our grading facility for evaluation.'
  },
  {
    image: '/assets/images/step-3.svg',
    title: 'AI Evaluation',
    desc: 'Our advanced AI system analyzes your card’s condition with precision.'
  },
  {
    image: '/assets/images/step-4.svg',
    title: 'Receive Report',
    desc: 'Get a detailed grading report and an optional certification for authenticity.'
  }
]

export default function GradingProcess() {

  const steps = () => {
    return STEPS.map((step, i) => (<StepCard key={i} {...step} />) )
  }

  return (
    <div className="h-[150rem] md:h-[84rem] xl:h-[64rem] bg-[url('/assets/images/subtract.svg')] p-20 w-full bg-cover">
      
      <div className="mt-48 px-10">
        <h1 className="text-3xl font-bold">Get Your Cards Graded with Ease</h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 mt-10 w-full place-items-center lg:gap-40">
         {steps()}
        </div>
      </div>
    </div>
  )
}