
interface SmallProgressBarProps {
  progress: number
}

export default function SmallProgressBar({progress}: SmallProgressBarProps) {
  return (
    <div className="w-full h-2 rounded-lg bg-soft-grey">
      <div className={`bg-custom-gradient h-2 rounded-lg`} style={{ width: `${progress}%` }}></div>
    </div>
  )
}