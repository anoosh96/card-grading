import { cardStatus } from "@/app/(user)/lib/utils/constants";
import { cardStatusMap } from "@/app/(user)/lib/utils/helpers";
import { CardData } from "@/stores/submissionStore";

interface CardItemProps {
  card: CardData;
  onClick: () => void;
  status: string;
}

function CardItem({ card, onClick, status }: CardItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case cardStatus.CARD_PENDING:
        return 'bg-red-100 text-red-600';
      case cardStatus.GRADING_IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-600';
      case cardStatus.GRADING_COMPLETE:
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{card.cardName}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {cardStatusMap[card.status as string]}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Category</span>
          <span className="text-gray-900 font-medium">{card.category}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Year</span>
          <span className="text-gray-900 font-medium">{card.yearOfRelease || 'N/A'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Service</span>
          <span className="text-gray-900 font-medium">{card.service?.name || 'Bulk Submssion'}</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;