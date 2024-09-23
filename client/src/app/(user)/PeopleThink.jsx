import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import reviews from "../../data/reviews.json";

const PeopleThink = () => {
  return (
    <div>
      <h3>
        People <span className="text-green-600">Think</span>
      </h3>

      <InfiniteMovingCards items={reviews} duration="slow" direction="right" />
    </div>
  );
};

export default PeopleThink;
