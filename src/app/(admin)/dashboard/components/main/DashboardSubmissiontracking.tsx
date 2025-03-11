import Image from "next/image";

const submissions = [
  {
    id: "876368",
    name: "Sports Card",
    image: "/assets/images/graded-section-card-2.svg",
    status: "completed",
  },
  {
    id: "876364",
    name: "Comics",
    image: "/assets/images/graded-section-card-2.svg",
    status: "pending",
  },
  {
    id: "876621",
    name: "EAU DE",
    image: "/assets/images/graded-section-card-2.svg",
    status: "grading",
  },
  {
    id: "876364",
    name: "Comics",
    image: "/assets/images/graded-section-card-2.svg",
    status: "pending",
  },
  {
    id: "876621",
    name: "EAU DE",
    image: "/assets/images/graded-section-card-2.svg",
    status: "grading",
  },
  {
    id: "876368",
    name: "Sports Card",
    image: "/assets/images/graded-section-card-2.svg",
    status: "completed",
  },
];

export function DashboardSubmissionTracking() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center p-5 justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-[2rem] text-charcol">Submission Tracking</h3>
          <p className="text-sm text-pure-grey">Real-time updates on grading status</p>
        </div>
        <button className="text-primary underline font-medium text-sm">View all &gt;</button>
      </div>

      {/* Add max-w-full to ensure it works inside flex containers */}
      <div className="w-full overflow-x-auto md:max-w-full">
        <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-full">
          <thead>
            <tr className="border-b px-16">
              <th className="text-left py-3 pl-16 pr-4">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Card no
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
              <th className="text-left py-3 px-4">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Card Name
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
              <th className="text-left py-3 pl-4 pr-16">
                <div className="flex text-dark-purple text-sm items-center gap-1">
                  Card Status
                  <Image src={"/icons/arrow_down.svg"} alt="Arrow Down Icon" width={6} height={5} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b last:border-0">
                <td className="py-3 pl-16 pr-4">#{submission.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Image src={submission.image} alt={submission.name} width={30} height={40} className="object-fill" />
                    <span className="text-sm text-dark-purple">{submission.name}</span>
                  </div>
                </td>
                <td className="py-3  px-4">
                  <span
                    className={`inline-block w-full lg:w-1/3 text-center capitalize px-10 py-3 rounded-full text-base font-semibold ${
                      submission.status === "completed"
                        ? "bg-muted-green/20 text-muted-green"
                        : submission.status === "pending"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
