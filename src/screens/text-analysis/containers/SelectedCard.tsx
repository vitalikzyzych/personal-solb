import { type FC } from "react";

interface ISelectedCard {
  title: string;
  subtitle: string;
  items: { label: string; count: number }[];
}

const SelectedCard: FC<ISelectedCard> = ({ title, subtitle, items }) => {
  return (
    <div className="card">
      <div className="grid">
        <div className="col-6 border-right-1 border-gray-100 flex flex-column justify-content-center align-items-center gap-3">
          <span className="text-4xl font-medium">{title}</span>
          <span>{subtitle}</span>
        </div>
        <div className="col-6 pl-4">
          <div className="flex flex-column gap-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-xl font-medium">{item.count}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCard;
