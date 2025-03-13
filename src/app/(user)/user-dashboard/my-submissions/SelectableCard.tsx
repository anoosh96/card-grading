import { ReactNode } from "react"

interface SelectableCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export default function SelectableCard({icon, title, desc, selected, setSelected, value} : SelectableCardProps){
  return(
    <div className={`rounded-3xl border-2 ${selected == value ? 'border-primary' : 'border-soft-grey'} py-14 px-10 flex items-center gap-4 cursor-pointer`} onClick={() => setSelected(value)}>
      {icon}
      <div>
         <h3 className="text-charcol text-xl font-medium">{title}</h3>
         <p className="text-charcol mt-2 font-normal">{desc}</p>
      </div>
    </div>
  )
}
