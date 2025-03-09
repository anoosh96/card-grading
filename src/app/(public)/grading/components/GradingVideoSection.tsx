import VideoPlayer from "@/components/VideoPlayer";


export default function GradingVideoSection() {
  return (
    <section className="-mt-44 md:mt-14 p-10">
      <h1 className="text-3xl font-bold"> See the Grading Process in Action </h1>
      
      <div className="mt-8">
       <VideoPlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
      </div>
    </section>

  )
}